//frontend/src/components/DifficultyStars.jsx

const difficultyMap = {
    1: { stars: '★☆☆☆☆', color: 'bg-green-100 text-green-800' },
    2: { stars: '★★☆☆☆', color: 'bg-lime-100 text-lime-800' },
    3: { stars: '★★★☆☆', color: 'bg-yellow-100 text-yellow-800' },
    4: { stars: '★★★★☆', color: 'bg-amber-200 text-amber-900' },
    5: { stars: '★★★★★', color: 'bg-purple-200 text-purple-900' },
  };
  
  export default function DifficultyStars({ level }) {
    if (!level || level < 1 || level > 5) return null;
    const { stars, color } = difficultyMap[level];
  
    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${color}`}
        title={`Poziom trudności: ${level}/5`}
      >
        {stars}
      </span>
    );
  }