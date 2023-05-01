package com.ownsong.api.board.repository;


import com.ownsong.api.board.entity.Board;
import com.ownsong.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByBoardTitleContaining(String search);
    List<Board> findByHeader(String search);
    List<Board> findByUser(User user);
}
