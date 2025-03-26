/*
  Warnings:

  - You are about to drop the `exercise_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout_sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercise_sessions" DROP CONSTRAINT "exercise_sessions_workout_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "exercise_sessions" DROP CONSTRAINT "exercise_sessions_workout_session_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_sessions" DROP CONSTRAINT "workout_sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "workout_sessions" DROP CONSTRAINT "workout_sessions_workout_id_fkey";

-- DropTable
DROP TABLE "exercise_sessions";

-- DropTable
DROP TABLE "workout_sessions";
