package com.ownsong.api.user.repository;


import com.ownsong.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUID(String UID);
    List<User> findByNicknameContaining(String search);
}
