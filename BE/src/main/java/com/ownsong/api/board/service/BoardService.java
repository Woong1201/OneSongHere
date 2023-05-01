package com.ownsong.api.board.service;

import com.ownsong.api.board.dto.request.BoardCreateRequest;
import com.ownsong.api.board.dto.request.BoardModifyRequest;
import com.ownsong.api.board.dto.response.BoardResponse;
import com.ownsong.api.board.entity.Board;
import com.ownsong.api.board.repository.BoardRepository;
import com.ownsong.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {
    private final BoardRepository boardRepository;

    public BoardResponse createBoard(BoardCreateRequest boardCreateRequest, User user) {
        Board board = boardRepository.save(new Board(boardCreateRequest, user));
        return new BoardResponse(board);
    }

    public BoardResponse ModifyBoard(BoardModifyRequest boardModifyRequest, User user) {
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
}