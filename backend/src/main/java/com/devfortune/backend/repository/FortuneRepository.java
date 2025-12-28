package com.devfortune.backend.repository;

import com.devfortune.backend.entity.Fortune;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 운세 레포지토리
 */
@Repository
public interface FortuneRepository extends JpaRepository<Fortune, Long> {

    /**
     * 아키타입으로 운세 목록 조회
     */
    List<Fortune> findByArchetype(String archetype);

    /**
     * 아키타입별 운세 개수 조회
     */
    long countByArchetype(String archetype);
}
