# Testing GameShield

This guide provides comprehensive instructions for testing the GameShield project, including unit tests, integration tests, and manual testing procedures.

## Testing Setup

GameShield uses Jest as its primary testing framework across all packages in the monorepo. The testing infrastructure is set up to work with Turborepo for efficient test execution.

## Running Tests

### Running All Tests

To run all tests across the monorepo:

```bash
pnpm run test
```

This command will execute tests for all packages in parallel, leveraging Turborepo's caching capabilities for faster subsequent runs.

### Testing Specific Packages

To test individual packages:

```bash
# Test the captcha-sdk
pnpm --filter captcha-sdk test

# Test the game-core
pnpm --filter game-core test

# Test the API
pnpm --filter api test
```

### Watch Mode

During development, you can use watch mode to automatically re-run tests when files change:

```bash
# Run all tests in watch mode
pnpm run test:watch

# Run specific package tests in watch mode
pnpm --filter captcha-sdk test:watch
```

### Coverage Reports

To generate test coverage reports:

```bash
# Generate coverage for all packages
pnpm run test:coverage

# Generate coverage for a specific package
pnpm --filter game-core test:coverage
```

Coverage reports are generated in the `coverage` directory of each package.

## Test Types

### Unit Tests

Unit tests focus on testing individual components and functions in isolation. These tests are located in the `tests` directory of each package.

Key unit test areas include:
- SDK API functionality
- Game mechanics
- Token generation and validation
- UI component rendering

### Integration Tests

Integration tests verify that different components work together correctly. These tests focus on:
- SDK integration with the game engine
- API interaction with the verification service
- End-to-end user flows

### Browser Tests

For testing browser-specific functionality:
- Tests run in a JSDOM environment that simulates browser APIs
- Canvas and WebGL operations are mocked
- Event handling and user interactions are simulated

## Manual Testing

### Local Development Environment

1. Start the development environment:
   ```bash
   pnpm run dev
   ```

2. This will start:
   - Frontend at http://localhost:3000
   - API server at http://localhost:3001

3. Test the CAPTCHA challenges by:
   - Completing different game types
   - Testing on different screen sizes
   - Verifying token generation

### Testing the SDK Integration

1. Build the SDK:
   ```bash
   pnpm --filter captcha-sdk build
   ```

2. Create a test HTML file that includes the SDK:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>GameShield Test</title>
   </head>
   <body>
     <div id="captcha-container"></div>
     <script src="path/to/captcha-sdk.min.js"></script>
     <script>
       const captcha = GameshieldCaptcha.generateCaptcha({
         container: document.getElementById('captcha-container')
       });
     </script>
   </body>
   </html>
   ```

3. Open the HTML file in different browsers to test compatibility

## Testing Game Types

Each game type requires specific testing approaches:

### Puzzle Games
- Test piece movement and placement
- Verify completion detection
- Test different difficulty levels

### Pattern Recognition
- Test pattern matching accuracy
- Verify timing constraints
- Test with different visual patterns

### Timing-Based Games
- Test reaction time measurement
- Verify scoring mechanism
- Test difficulty progression

### Physics-Based Games
- Test physics simulation
- Verify collision detection
- Test user interaction with physics objects

## Testing Accessibility

Verify that games are accessible:
- Test keyboard navigation
- Verify color contrast
- Test with screen readers
- Ensure alternative challenges are available

## Performance Testing

Monitor performance metrics:
- Load time
- Frame rate during gameplay
- Memory usage
- Network requests

## Security Testing

Verify security measures:
- Token validation
- Protection against automated solvers
- Rate limiting
- Server-side verification

## Troubleshooting Tests

If tests are failing:

1. Check that all dependencies are installed:
   ```bash
   pnpm install
   ```

2. Ensure test environment is properly set up:
   ```bash
   pnpm --filter captcha-sdk build
   ```

3. Check for environment-specific issues:
   ```bash
   NODE_ENV=test pnpm run test
   ```

4. Look for specific test failures in the output and debug individual tests:
   ```bash
   pnpm --filter game-core test -t "should handle difficulty levels"
   ```

## Continuous Integration

GameShield uses GitHub Actions for continuous integration testing. On each pull request and push to main:
- All tests are run
- Coverage reports are generated
- Build artifacts are created and verified

## Next Steps

- Check out the [Integration Examples](/guide/integration-examples) for implementation guidance
- Review the [Troubleshooting](/guide/troubleshooting) guide for common issues
- Explore the [API Reference](/api/) for detailed configuration options
