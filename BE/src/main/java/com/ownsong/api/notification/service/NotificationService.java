package com.ownsong.api.notification.service;

import com.ownsong.api.notification.dto.response.NotificationResponse;
import com.ownsong.api.notification.entity.Notification;
import com.ownsong.api.notification.repository.NotificationRepository;
import com.ownsong.api.user.entity.User;
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

    public List<NotificationResponse> getNotifications(User user) {
        List<Notification> notifications;
        try {
            notifications = notificationRepository.findAllByUser(user);
        } catch (Exception e) {
            return null;
        }
        List<NotificationResponse> notificationResponses = new ArrayList<>();
        for (Notification notification : notifications) {
            notificationResponses.add(new NotificationResponse(notification));
        }
        return notificationResponses;
    }
}
