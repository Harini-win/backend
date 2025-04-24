import { useEffect } from 'react';

export const FoodEmoji = () => {
  useEffect(() => {
    const createFoodEmoji = (x: number, y: number) => {
      const emojiList = ["🍕", "🍔", "🍣", "🍩", "🍉", "🍪", "🥑", "🍟", "🍎", "🌮"];
      const foodEmoji = document.createElement("div");
      foodEmoji.classList.add("food-emoji");
      foodEmoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

      foodEmoji.style.left = `${x}px`;
      foodEmoji.style.top = `${y}px`;

      const randomX = (Math.random() - 0.5) * 100;
      const randomY = Math.random() * 100 + 50;
      foodEmoji.style.setProperty("--x", `${randomX}px`);
      foodEmoji.style.setProperty("--y", `${randomY}px`);

      document.body.appendChild(foodEmoji);

      setTimeout(() => {
        foodEmoji.remove();
      }, 1000);
    };

    const handleMouseMove = (event: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        createFoodEmoji(event.clientX, event.clientY);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}; 