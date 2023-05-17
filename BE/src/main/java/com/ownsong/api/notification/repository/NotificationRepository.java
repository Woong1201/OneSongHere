package com.ownsong.api.notification.repository;


import com.ownsong.api.notification.entity.Notification;
import com.ownsong.api.relayStudio.entity.RelayStudio;
import com.ownsong.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByUser(User user);
    void deleteAllByRelayStudio(RelayStudio relayStudio);
}