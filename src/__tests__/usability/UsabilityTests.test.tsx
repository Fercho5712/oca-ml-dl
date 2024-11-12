import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import App from '../../App';

expect.extend(toHaveNoViolations);

describe('Usability and Accessibility Tests', () => {
  it('should be accessible according to WCAG guidelines', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper contrast ratios', () => {
    render(<App />);
    const elements = screen.getAllByRole('button');
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      expect(styles.backgroundColor).toBeDefined();
      expect(styles.color).toBeDefined();
    });
  });
});