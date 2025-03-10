# Game Types

Gameshield offers a variety of game types to provide both security and accessibility. Each game type is designed to be easy for humans but challenging for bots.

## Available Game Types

### Pong (Human Reflex Test) 🏓

**Description**: A classic Pong game where users must hit a ball with a paddle.

**How it works**:
- The user controls a paddle at the bottom of the screen
- A ball bounces around the screen
- The user must hit the ball a specific number of times to pass
- The ball moves with unpredictable patterns, making it hard for bots

**Security features**:
- Ball movement has randomized angles and speeds
- The system tracks natural movement patterns of the paddle
- Requires human-like reflexes and prediction

**Accessibility**: Moderate - requires hand-eye coordination and reflexes

### Snake (Pattern Completion Challenge) 🐍

**Description**: Users control a snake to collect specific food items while avoiding obstacles.

**How it works**:
- The player controls a snake that moves around a grid
- The snake must collect food in a specific order (e.g., "Eat 3 apples, but avoid bananas")
- The snake grows longer with each food item, increasing difficulty

**Security features**:
- Food placement is randomized
- Requires decision-making rather than random movements
- The system analyzes movement patterns for bot detection

**Accessibility**: High - simple controls with clear visual feedback

### Breakout (Brick Breaking Challenge) 🧱

**Description**: Users control a paddle to bounce a ball and break bricks.

**How it works**:
- The user controls a paddle at the bottom of the screen
- A ball bounces off the paddle and walls
- The user must break a specific number of bricks to pass
- The ball's speed changes to make it unpredictable for bots

**Security features**:
- Ball physics include randomized angles and speeds
- The system tracks paddle movement patterns
- Requires human-like prediction and reaction

**Accessibility**: Moderate - requires hand-eye coordination

### Dino Run (Jump Timing Test) 🦖

**Description**: Users control a character that must jump over obstacles.

**How it works**:
- The player controls a character that automatically runs
- Obstacles appear at varying intervals and speeds
- The player must time jumps correctly to avoid obstacles
- The player must successfully clear a specific number of obstacles to pass

**Security features**:
- Obstacle timing and spacing is randomized
- Requires human timing and prediction
- The system analyzes jump patterns for bot detection

**Accessibility**: High - simple controls with clear visual feedback

### Puzzle Slider 🧩

**Description**: A classic sliding puzzle where users must arrange tiles to complete an image.

**How it works**:
- A complete image is divided into a grid of tiles (typically 3x3 or 4x4)
- One tile is removed, creating an empty space
- Tiles adjacent to the empty space can be moved into it
- The user must arrange the tiles to form the complete image

**Security features**:
- Each puzzle is randomly generated with different images
- The solution requires spatial reasoning and planning
- The system tracks natural movement patterns during solving

**Accessibility**: Moderate - requires visual recognition and spatial reasoning

### Pattern Matching 🔍

**Description**: Users must identify and select elements that match a specific pattern or category.

**How it works**:
- A set of visual elements is displayed (shapes, icons, etc.)
- The user must select all elements that match a given criteria
- Criteria might include "select all red items" or "select items in a specific order"

**Security features**:
- Patterns and criteria are randomly generated
- The system analyzes selection timing and accuracy
- Multiple valid solutions with varying efficiency

**Accessibility**: High - can be adapted for color blindness and other visual impairments

### Maze Navigation 🌀

**Description**: Users guide an object through a randomly generated maze.

**How it works**:
- A procedurally generated maze is displayed
- Users must navigate from start to finish by drawing a path
- Obstacles and dead ends create complexity

**Security features**:
- Each maze is uniquely generated
- The system analyzes path efficiency and correction patterns
- Speed and accuracy metrics help identify automated attempts

**Accessibility**: Moderate - requires fine motor control

### Physics Puzzles ⚖️

**Description**: Users solve simple physics-based challenges that require intuitive understanding of physical properties.

**How it works**:
- Objects with physical properties (gravity, collision, etc.) are presented
- Users must interact with these objects to achieve a goal
- Examples include stacking blocks, balancing objects, or directing a ball to a target

**Security features**:
- Challenges leverage human intuitive understanding of physics
- The system analyzes interaction patterns and solution approach
- Multiple valid solutions with varying efficiency

**Accessibility**: Moderate to High - intuitive and adaptable

### Sequence Memory 🔢

**Description**: Users must remember and reproduce a sequence of events.

**How it works**:
- A sequence of visual or audio cues is presented
- Users must reproduce the sequence in the correct order
- Difficulty scales with sequence length and complexity

**Security features**:
- Sequences are randomly generated
- The system analyzes timing between inputs
- Pattern recognition that's natural for humans but difficult for bots

**Accessibility**: Variable - can be adapted for different abilities (visual, audio, etc.)

## Game Selection Algorithm

Gameshield uses a smart selection algorithm to determine which game to present to each user:

1. **Device Detection**: Identifies the user's device type and capabilities
2. **Accessibility Awareness**: Considers any detected accessibility tools
3. **Progressive Challenge**: Starts with simpler games and increases difficulty if suspicious behavior is detected
4. **Rotation Strategy**: Varies game types to prevent learning attacks

## Customization Options

You can customize which games appear in your integration:

```javascript
import { generateCaptcha } from '@gameshield/captcha-sdk';

generateCaptcha({
  container: document.getElementById('captcha-container'),
  gameTypes: ['pong', 'snake', 'breakout', 'dino-run', 'puzzle', 'pattern', 'maze', 'physics', 'sequence'], // Only use these game types
  preferredGameType: 'pong', // Try to use this game type when possible
  excludeGameTypes: [], // Never use these game types
  difficulty: 'medium', // 'easy', 'medium', or 'hard'
});
```

## Next Steps

- Learn how to [customize](/guide/customization) the appearance and behavior of games
- See [integration examples](/guide/integration-examples) for implementation guidance
- Check out the [API reference](/api/sdk-methods) for detailed configuration options
