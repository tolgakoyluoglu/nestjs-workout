import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const exercises = [
    {
      name: 'Barbell Bench Press',
      description:
        'A compound chest exercise that also works the shoulders and triceps.',
      imageUrl: 'https://example.com/images/barbell-bench-press.jpg',
      videoUrl: 'https://example.com/videos/barbell-bench-press.mp4',
      instructions:
        'Lie on a flat bench with your feet on the ground. Grip the barbell with hands slightly wider than shoulder-width apart. Lower the bar to your mid-chest, then push it back up to the starting position.',
      difficulty: 'intermediate',
      equipmentNeeded: ['barbell', 'bench'],
      musclesPrimary: ['chest'],
      musclesSecondary: ['shoulders', 'triceps'],
    },
    {
      name: 'Squat',
      description:
        'A compound lower body exercise that targets multiple muscle groups.',
      imageUrl: 'https://example.com/images/squat.jpg',
      videoUrl: 'https://example.com/videos/squat.mp4',
      instructions:
        'Stand with feet shoulder-width apart, barbell across upper back. Bend knees and lower hips until thighs are parallel to floor. Keep back straight and return to starting position.',
      difficulty: 'intermediate',
      equipmentNeeded: ['barbell', 'squat rack'],
      musclesPrimary: ['quadriceps'],
      musclesSecondary: ['hamstrings', 'glutes', 'lower back'],
    },
    {
      name: 'Deadlift',
      description: 'A compound movement that works the entire posterior chain.',
      imageUrl: 'https://example.com/images/deadlift.jpg',
      videoUrl: 'https://example.com/videos/deadlift.mp4',
      instructions:
        'Stand with feet hip-width apart, barbell over mid-foot. Bend at hips and knees to grip the bar. Keeping back straight, stand up with the weight, then lower it back to the ground.',
      difficulty: 'advanced',
      equipmentNeeded: ['barbell'],
      musclesPrimary: ['lower back'],
      musclesSecondary: ['hamstrings', 'glutes', 'traps', 'forearms'],
    },
    {
      name: 'Pull-up',
      description: 'A bodyweight exercise that builds upper body strength.',
      imageUrl: 'https://example.com/images/pull-up.jpg',
      videoUrl: 'https://example.com/videos/pull-up.mp4',
      instructions:
        'Hang from a pull-up bar with palms facing away and hands shoulder-width apart. Pull yourself up until your chin is over the bar, then lower back down with control.',
      difficulty: 'intermediate',
      equipmentNeeded: ['pull-up bar'],
      musclesPrimary: ['lats'],
      musclesSecondary: ['biceps', 'middle back', 'shoulders'],
    },
    {
      name: 'Overhead Press',
      description: 'A shoulder press exercise that builds upper body strength.',
      imageUrl: 'https://example.com/images/overhead-press.jpg',
      videoUrl: 'https://example.com/videos/overhead-press.mp4',
      instructions:
        'Stand with feet shoulder-width apart, holding a barbell at shoulder height with palms facing forward. Press the bar overhead until arms are fully extended, then lower back to shoulders.',
      difficulty: 'intermediate',
      equipmentNeeded: ['barbell'],
      musclesPrimary: ['shoulders'],
      musclesSecondary: ['triceps', 'upper chest', 'traps'],
    },
    {
      name: 'Barbell Row',
      description: 'A compound back exercise that also works the biceps.',
      imageUrl: 'https://example.com/images/barbell-row.jpg',
      videoUrl: 'https://example.com/videos/barbell-row.mp4',
      instructions:
        'Bend at the hips with knees slightly bent, holding a barbell with hands shoulder-width apart. Pull the bar to your lower chest while keeping your back straight, then lower it back down.',
      difficulty: 'intermediate',
      equipmentNeeded: ['barbell'],
      musclesPrimary: ['middle back'],
      musclesSecondary: ['lats', 'biceps', 'shoulders'],
    },
    {
      name: 'Leg Press',
      description: 'A machine-based lower body exercise.',
      imageUrl: 'https://example.com/images/leg-press.jpg',
      videoUrl: 'https://example.com/videos/leg-press.mp4',
      instructions:
        'Sit on the leg press machine with feet shoulder-width apart on the platform. Release the safety bars and lower the platform until legs form a 90-degree angle, then push back up.',
      difficulty: 'beginner',
      equipmentNeeded: ['leg press machine'],
      musclesPrimary: ['quadriceps'],
      musclesSecondary: ['hamstrings', 'glutes'],
    },
    {
      name: 'Dumbbell Lunges',
      description:
        'A unilateral leg exercise that improves balance and strength.',
      imageUrl: 'https://example.com/images/dumbbell-lunges.jpg',
      videoUrl: 'https://example.com/videos/dumbbell-lunges.mp4',
      instructions:
        'Hold dumbbells at your sides. Step forward with one leg and lower your body until both knees form 90-degree angles. Push back to the starting position and repeat with the other leg.',
      difficulty: 'beginner',
      equipmentNeeded: ['dumbbells'],
      musclesPrimary: ['quadriceps'],
      musclesSecondary: ['hamstrings', 'glutes', 'calves'],
    },
    {
      name: 'Lat Pulldown',
      description: 'A machine exercise targeting the latissimus dorsi muscles.',
      imageUrl: 'https://example.com/images/lat-pulldown.jpg',
      videoUrl: 'https://example.com/videos/lat-pulldown.mp4',
      instructions:
        'Sit at a lat pulldown machine with knees secured. Grab the bar with hands wider than shoulder-width apart. Pull the bar down to your upper chest, then slowly release back up.',
      difficulty: 'beginner',
      equipmentNeeded: ['lat pulldown machine'],
      musclesPrimary: ['lats'],
      musclesSecondary: ['biceps', 'middle back', 'shoulders'],
    },
    {
      name: 'Dumbbell Shoulder Press',
      description: 'A shoulder exercise using dumbbells for stability.',
      imageUrl: 'https://example.com/images/dumbbell-shoulder-press.jpg',
      videoUrl: 'https://example.com/videos/dumbbell-shoulder-press.mp4',
      instructions:
        'Sit on a bench with back support. Hold dumbbells at shoulder height with palms facing forward. Press the weights upward until arms are extended, then lower back to starting position.',
      difficulty: 'beginner',
      equipmentNeeded: ['dumbbells', 'bench'],
      musclesPrimary: ['shoulders'],
      musclesSecondary: ['triceps', 'upper chest'],
    },
    {
      name: 'Bicep Curl',
      description: 'An isolation exercise for the biceps.',
      imageUrl: 'https://example.com/images/bicep-curl.jpg',
      videoUrl: 'https://example.com/videos/bicep-curl.mp4',
      instructions:
        'Stand with feet shoulder-width apart, holding dumbbells at your sides with palms facing forward. Curl the weights up toward your shoulders, then lower back down with control.',
      difficulty: 'beginner',
      equipmentNeeded: ['dumbbells'],
      musclesPrimary: ['biceps'],
      musclesSecondary: ['forearms'],
    },
    {
      name: 'Tricep Pushdown',
      description: 'An isolation exercise for the triceps.',
      imageUrl: 'https://example.com/images/tricep-pushdown.jpg',
      videoUrl: 'https://example.com/videos/tricep-pushdown.mp4',
      instructions:
        'Stand facing a cable machine with a rope or bar attachment at chest height. Grip the attachment and push it down until arms are fully extended, then return to starting position.',
      difficulty: 'beginner',
      equipmentNeeded: ['cable machine'],
      musclesPrimary: ['triceps'],
      musclesSecondary: [],
    },
    {
      name: 'Dumbbell Chest Fly',
      description: 'An isolation exercise for the chest muscles.',
      imageUrl: 'https://example.com/images/dumbbell-chest-fly.jpg',
      videoUrl: 'https://example.com/videos/dumbbell-chest-fly.mp4',
      instructions:
        'Lie on a flat bench holding dumbbells extended above chest with palms facing each other. Lower the weights out to sides in an arc motion, then bring them back together above your chest.',
      difficulty: 'intermediate',
      equipmentNeeded: ['dumbbells', 'bench'],
      musclesPrimary: ['chest'],
      musclesSecondary: ['shoulders'],
    },
    {
      name: 'Romanian Deadlift',
      description:
        'A hamstring-focused exercise that also targets the lower back.',
      imageUrl: 'https://example.com/images/romanian-deadlift.jpg',
      videoUrl: 'https://example.com/videos/romanian-deadlift.mp4',
      instructions:
        'Stand with feet hip-width apart, holding a barbell at thigh level. Keeping back straight and knees slightly bent, hinge at the hips to lower the bar toward the ground, then return to standing.',
      difficulty: 'intermediate',
      equipmentNeeded: ['barbell'],
      musclesPrimary: ['hamstrings'],
      musclesSecondary: ['lower back', 'glutes'],
    },
    {
      name: 'Plank',
      description:
        'A core stability exercise that engages multiple muscle groups.',
      imageUrl: 'https://example.com/images/plank.jpg',
      videoUrl: 'https://example.com/videos/plank.mp4',
      instructions:
        'Get into a push-up position with forearms on the ground and elbows under shoulders. Keep body in a straight line from head to heels, engaging core muscles. Hold the position.',
      difficulty: 'beginner',
      equipmentNeeded: [],
      musclesPrimary: ['abs'],
      musclesSecondary: ['lower back', 'shoulders'],
    },
    {
      name: 'Calf Raise',
      description: 'An isolation exercise for the calf muscles.',
      imageUrl: 'https://example.com/images/calf-raise.jpg',
      videoUrl: 'https://example.com/videos/calf-raise.mp4',
      instructions:
        'Stand on a raised platform with heels hanging off the edge. Lower heels below platform level, then raise up onto toes as high as possible. Can be done with bodyweight or holding weights.',
      difficulty: 'beginner',
      equipmentNeeded: ['platform'],
      musclesPrimary: ['calves'],
      musclesSecondary: [],
    },
    {
      name: 'Leg Curl',
      description: 'A machine exercise isolating the hamstrings.',
      imageUrl: 'https://example.com/images/leg-curl.jpg',
      videoUrl: 'https://example.com/videos/leg-curl.mp4',
      instructions:
        'Lie face down on a leg curl machine with the pad against the back of your ankles. Curl your legs up by bringing your heels toward your buttocks, then lower back down with control.',
      difficulty: 'beginner',
      equipmentNeeded: ['leg curl machine'],
      musclesPrimary: ['hamstrings'],
      musclesSecondary: [],
    },
    {
      name: 'Lateral Raise',
      description: 'An isolation exercise for the lateral deltoids.',
      imageUrl: 'https://example.com/images/lateral-raise.jpg',
      videoUrl: 'https://example.com/videos/lateral-raise.mp4',
      instructions:
        "Stand with feet shoulder-width apart, holding dumbbells at your sides. Raise arms out to the sides until they're parallel to the floor, then lower back down with control.",
      difficulty: 'beginner',
      equipmentNeeded: ['dumbbells'],
      musclesPrimary: ['shoulders'],
      musclesSecondary: ['traps'],
    },
    {
      name: 'Face Pull',
      description: 'A rear deltoid and upper back exercise.',
      imageUrl: 'https://example.com/images/face-pull.jpg',
      videoUrl: 'https://example.com/videos/face-pull.mp4',
      instructions:
        'Stand facing a cable machine with rope attachment at head height. Pull the rope toward your face, separating the ends to either side of your head. Squeeze shoulder blades together at the end of the movement.',
      difficulty: 'intermediate',
      equipmentNeeded: ['cable machine'],
      musclesPrimary: ['shoulders'],
      musclesSecondary: ['traps', 'middle back'],
    },
    {
      name: 'Dips',
      description: 'A compound bodyweight exercise for the upper body.',
      imageUrl: 'https://example.com/images/dips.jpg',
      videoUrl: 'https://example.com/videos/dips.mp4',
      instructions:
        'Support yourself on parallel bars with arms extended. Lower your body by bending your elbows until shoulders are below elbows, then push back up to starting position.',
      difficulty: 'intermediate',
      equipmentNeeded: ['parallel bars'],
      musclesPrimary: ['triceps'],
      musclesSecondary: ['chest', 'shoulders'],
    },
  ];

  console.log(`Start seeding exercises...`);
  for (const exercise of exercises) {
    const result = await prisma.exercise.create({
      data: exercise,
    });
    console.log(`Created exercise with id: ${result.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
