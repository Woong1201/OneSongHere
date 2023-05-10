package com.ownsong.api.notification.service;

import com.ownsong.api.notification.entity.Notification;
import com.ownsong.api.notification.repository.NotificationRepository;
import com.ownsong.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public boolean deleteNotification(Long notiId, User user) {
        Notification notification;
        try {
            notification = notificationRepository.findById(notiId).get();
            if (notification == null)
                return false;
        } catch (Exception e) {
            return false;
        }
        if (notification.getUser().getUserID() != user.getUserID())
            return false;
        notificationRepository.delete(notification);
        return true;
    }
}
