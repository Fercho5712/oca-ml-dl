import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LocationData from '../../pages/LocationData';
import { LocationDataProvider } from '../../context/LocationDataContext';

describe('Data Privacy Tests', () => {
  it('should not display sensitive location data publicly', () => {
    render(
      <LocationDataProvider>
        <LocationData />
      </LocationDataProvider>
    );
    
    // Verify no sensitive coordinates are displayed
    const content = screen.queryByText(/^\d+\.\d+,\s*\d+\.\d+$/);
    expect(content).not.toBeInTheDocument();
  });

  it('should mask sensitive information', () => {
    render(
      <LocationDataProvider>
        <LocationData />
      </LocationDataProvider>
    );
    
    // Verify personal/sensitive info is masked
    const sensitiveData = screen.queryByText(/^\d{16}$/); // Credit card format
    expect(sensitiveData).not.toBeInTheDocument();
  });
});