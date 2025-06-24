/*
  # Create prayer requests table

  1. New Tables
    - `prayer_requests`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `request` (text, not null)
      - `is_read` (boolean, default false)
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `prayer_requests` table
    - Add policy for public insert (anyone can submit prayer requests)
    - Add policy for authenticated read (only authenticated users can view)
    - Add policy for authenticated update (only authenticated users can mark as read)
    - Add policy for authenticated delete (only authenticated users can delete)
*/

CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Anônimo',
  request text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert prayer requests (public submissions)
CREATE POLICY "Anyone can submit prayer requests"
  ON prayer_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view prayer requests
CREATE POLICY "Authenticated users can view prayer requests"
  ON prayer_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update prayer requests
CREATE POLICY "Authenticated users can update prayer requests"
  ON prayer_requests
  FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete prayer requests
CREATE POLICY "Authenticated users can delete prayer requests"
  ON prayer_requests
  FOR DELETE
  TO authenticated
  USING (true);