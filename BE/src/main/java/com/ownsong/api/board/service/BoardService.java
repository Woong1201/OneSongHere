package com.ownsong.api.board.service;

import com.ownsong.api.board.dto.request.BoardCreateRequest;
import com.ownsong.api.board.dto.request.BoardModifyRequest;
import com.ownsong.api.board.dto.request.CommentCreateRequest;
import com.ownsong.api.board.dto.request.CommentModifyRequest;
import com.ownsong.api.board.dto.response.BoardListResponse;
import com.ownsong.api.board.dto.response.BoardResponse;
import com.ownsong.api.board.entity.Board;
import com.ownsong.api.board.entity.Comment;
import com.ownsong.api.board.repository.BoardRepository;
import com.ownsong.api.board.repository.CommentRepository;
import com.ownsong.api.user.entity.User;
import com.ownsong.api.user.repository.UserRepository;
import com.ownsong.api.user.social.Constant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public BoardResponse createBoard(BoardCreateRequest boardCreateRequest, User user) {
        Board board = boardRepository.save(new Board(boardCreateRequest, user));
        return new BoardResponse(board);
    }

    public BoardResponse modifyBoard(BoardModifyRequest boardModifyRequest, User user) {
        Board board;
        // board 가 존재하지 않을 때
        try {
            board = boardRepository.findById(boardModifyRequest.getBoardId()).get();
        }catch (Exception e) {
            return null;
        }
        // board 의 수정 권한이 없을 때
        if (board.getUser().getUserID() != user.getUserID())
            return null;
        board.updateBoard(boardModifyRequest);
        boardRepository.save(board);
        return new BoardResponse(board);
    }

    public boolean deleteBoard(Long boardId, User user) {
        Board board;
        // board 가 존재하지 않을 때
        try {
            board = boardRepository.findById(boardId).get();
        }catch (Exception e) {
            return false;
        }
        // board 의 삭제 권한이 없을 때
        if (board.getUser().getUserID() != user.getUserID())
            return false;
        boardRepository.delete(board);
        return true;
    }

    public BoardResponse getBoard(Long boardId) {
        Board board;
        // board 가 db 에 존재하는지 확인 후 dto 변환
        try {
            board = boardRepository.findById(boardId).get();
        }catch (Exception e) {
            return null;
        }
        return new BoardResponse(board);
    }

    public List<BoardListResponse> getBoards() {
        List<Board> boards = boardRepository.findAll();
        List<BoardListResponse> boardListResponses = new ArrayList<>();
        //  boardListResponse Dto 로 변환
        for (Board board : boards) {
            boardListResponses.add(new BoardListResponse(board));
        }
        return boardListResponses;
    }

    // searchType 에 맞게 결과 return
    public List<BoardListResponse> searchBoards(Constant.SearchType searchType, String search) {
        List<Board> boards;

        // title 에 대해 검색
        if (searchType == Constant.SearchType.TITLE)
            boards = boardRepository.findByBoardTitleContaining(search);
        // header 에 대해 검색
        else if (searchType == Constant.SearchType.HEADER)
            boards = boardRepository.findByHeader(search);
        // user nickName 에 대해 검색
        else if (searchType == Constant.SearchType.NICKNAME) {
            List<User> users = userRepository.findByNicknameContaining(search);
            boards = new ArrayList<>();
            for (User user : users) {
                for (Board board : boardRepository.findByUser(user)) {
                    boards.add(board);
                }
            }
        }
        // type 이 적절하지 않은 경우
        else
            return new ArrayList<>();

        //  boardListResponse Dto 로 변환
        List<BoardListResponse> boardListResponses = new ArrayList<>();
        for (Board board : boards) {
            boardListResponses.add(new BoardListResponse(board));
        }
        return boardListResponses;
    }

    public BoardResponse createComment(CommentCreateRequest commentCreateRequest, User user) {
        Board board;
        // board 가 db 에 존재하는지 확인
        try {
            board = boardRepository.findById(commentCreateRequest.getBoardId()).get();
        }catch (Exception e) {
            return null;
        }
        // comment 를 db 에 저장
        Comment comment = commentRepository.save(new Comment(commentCreateRequest, user, board));
        board.getComments().add(comment);

        return new BoardResponse(board);
    }

    public BoardResponse modifyComment(CommentModifyRequest commentModifyRequest, User user) {
        Comment comment;
        // 수정하려는 comment 가 db 에 존재하는지 확인
        try {
            comment = commentRepository.findById(commentModifyRequest.getCommentId()).get();
        }catch (Exception e) {
            return null;
        }

        // comment 를 수정 후 db에 저장
        comment.modifyComment(commentModifyRequest);
        commentRepository.save(comment);

        return new BoardResponse(comment.getBoard());
    }

    public BoardResponse deleteComment(Long commentId, User user) {
        Comment comment;
        // 삭제하려는 comment 가 db 에 존재하는지 확인
        try {
            comment = commentRepository.findById(commentId).get();
        }catch (Exception e) {
            return null;
        }

        // comment 의 삭제 권한 확인
        if (comment.getUser().getUserID() != user.getUserID())
            return null;

        // comment 삭제 후 board 리턴
        Board board = comment.getBoard();
        board.getComments().remove(comment);
        commentRepository.deleteById(commentId);
        return new BoardResponse(boardRepository.save(board));
    }
}