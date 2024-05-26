'use client'

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const bird = {
      x: 50,
      y: 150,
      width: 20,
      height: 20,
      gravity: 0.6,
      lift: -8,
      velocity: 0,
    };

    const pipes = [];
    const pipeWidth = 50;
    const pipeGap = 120;
    let frameCount = 0;

    function drawBird() {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    }

    function updateBird() {
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;

      if (bird.y + bird.height > canvas.height) {
        bird.y = canvas.height - bird.height;
        bird.velocity = 0;
        endGame();
      }

      if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
      }
    }

    function createPipe() {
      const pipeY = Math.floor(Math.random() * (canvas.height - pipeGap - 20)) + 10;
      pipes.push({
        x: canvas.width,
        y: pipeY,
      });
    }

    function drawPipes() {
      ctx.fillStyle = 'green';
      pipes.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);
      });
    }

    function updatePipes() {
      pipes.forEach((pipe) => {
        pipe.x -= 2;
      });

      if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
        pipes.shift();
        setScore((prevScore) => prevScore + 1);
      }
    }

    function checkCollision() {
      for (const pipe of pipes) {
        if (
          bird.x < pipe.x + pipeWidth &&
          bird.x + bird.width > pipe.x &&
          (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)
        ) {
          return true;
        }
      }
      return false;
    }

    function endGame() {
      setIsGameOver(true);
    }

    function resetGame() {
      bird.y = 150;
      bird.velocity = 0;
      pipes.length = 0;
      frameCount = 0;
      setScore(0);
      setIsGameOver(false);
      gameLoop();
    }

    function gameLoop() {
      if (isGameOver) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateBird();
      drawBird();

      if (frameCount % 90 === 0) {
        createPipe();
      }
      updatePipes();
      drawPipes();

      if (checkCollision()) {
        endGame();
        return;
      }

      frameCount++;
      requestAnimationFrame(gameLoop);
    }

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space' && !isGameOver) {
        bird.velocity = bird.lift;
      } else if (event.code === 'Space' && isGameOver) {
        resetGame();
      }
    });

    gameLoop();
  }, [isGameOver]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#70c5ce' }}>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} width="400" height="600" style={{ border: '2px solid #000' }}></canvas>
        <div style={{ position: 'absolute', top: '10px', left: '10px', color: '#fff', fontSize: '20px' }}>Score: {score}</div>
        {isGameOver && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', background: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px' }}>
            <h1>Game Over</h1>
            <p>Score: {score}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
