CREATE TABLE user_reports (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code text NOT NULL,
  intent     text NOT NULL CHECK (intent IN ('coding','creative','research','business','learning')),
  sub_action text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_user_reports_country ON user_reports(country_code);
CREATE INDEX idx_user_reports_intent ON user_reports(intent);

CREATE VIEW country_intent_summary AS
SELECT country_code,
       intent,
       COUNT(*)::int as count
FROM user_reports
GROUP BY country_code, intent;

ALTER TABLE user_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert reports"
  ON user_reports FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read summary"
  ON user_reports FOR SELECT
  TO anon
  USING (true);

GRANT SELECT ON country_intent_summary TO anon;
