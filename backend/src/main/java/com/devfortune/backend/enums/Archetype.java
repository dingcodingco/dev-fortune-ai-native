package com.devfortune.backend.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 개발자 아키타입
 */
@Getter
@RequiredArgsConstructor
public enum Archetype {

    BUG_HUNTER("bug-hunter", "버그 헌터", "버그를 찾는 데 탁월한 개발자"),
    PEACEFUL_DEV("peaceful-dev", "평화주의 개발자", "워라밸을 중시하는 개발자"),
    FIRE_FIGHTER("fire-fighter", "소방관", "긴급 상황에 강한 개발자"),
    TEAM_PLAYER("team-player", "팀 플레이어", "협업을 중시하는 개발자"),
    AI_NATIVE("ai-native", "AI 네이티브", "AI 도구를 적극 활용하는 개발자"),
    TRADITIONAL("traditional", "전통주의자", "검증된 방식을 선호하는 개발자");

    private final String id;
    private final String name;
    private final String description;

    /**
     * ID로 아키타입 찾기
     */
    public static Archetype fromId(String id) {
        for (Archetype archetype : values()) {
            if (archetype.getId().equals(id)) {
                return archetype;
            }
        }
        throw new IllegalArgumentException("Unknown archetype id: " + id);
    }
}
