-- 운세 테이블
CREATE TABLE IF NOT EXISTS fortunes (
    id BIGSERIAL PRIMARY KEY,
    archetype VARCHAR(50) NOT NULL,
    archetype_name VARCHAR(100) NOT NULL,
    archetype_description TEXT NOT NULL,

    -- 버그 운세
    bug_total_bugs INTEGER,
    bug_production_bugs INTEGER,
    bug_advice TEXT,
    bug_meme_message VARCHAR(500),

    -- 야근 운세
    overtime_expected_count INTEGER,
    overtime_risk_month VARCHAR(50),
    overtime_advice TEXT,
    overtime_meme_message VARCHAR(500),

    -- 기술 스택 운세
    tech_stack_to_learn VARCHAR(200),
    tech_mastery_percentage INTEGER,
    tech_advice TEXT,
    tech_meme_message VARCHAR(500),

    -- 코드 리뷰 운세
    code_review_total_comments INTEGER,
    code_review_lgtm_probability INTEGER,
    code_review_advice TEXT,
    code_review_meme_message VARCHAR(500),

    -- GitHub 운세
    github_total_commits INTEGER,
    github_longest_streak INTEGER,
    github_advice TEXT,
    github_meme_message VARCHAR(500),

    -- 회의 운세
    meeting_total_meetings INTEGER,
    meeting_necessary_percentage INTEGER,
    meeting_advice TEXT,
    meeting_meme_message VARCHAR(500),

    -- 메타데이터
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 퀴즈 답변 테이블
CREATE TABLE IF NOT EXISTS quiz_answers (
    id BIGSERIAL PRIMARY KEY,
    question_id VARCHAR(50) NOT NULL,
    option_id VARCHAR(50) NOT NULL,
    value INTEGER NOT NULL,
    fortune_id BIGINT NOT NULL,

    CONSTRAINT fk_fortune
        FOREIGN KEY (fortune_id)
        REFERENCES fortunes(id)
        ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX idx_fortunes_archetype ON fortunes(archetype);
CREATE INDEX idx_fortunes_created_at ON fortunes(created_at);
CREATE INDEX idx_quiz_answers_fortune_id ON quiz_answers(fortune_id);

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_fortunes_updated_at
    BEFORE UPDATE ON fortunes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
