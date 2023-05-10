package com.ownsong.api.sheet.repository;

import com.ownsong.api.sheet.entity.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SheetRepository extends JpaRepository<Sheet, Long> {
}
