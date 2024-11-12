import { render, screen } from '@testing-library/react';
import Analysis from '../../pages/Analysis';
import { LocationDataProvider } from '../../context/LocationDataContext';
import { describe, it, expect } from 'vitest';

describe('Analysis Page', () => {
  it('renders analysis components', () => {
    render(
      <LocationDataProvider>
        <Analysis />
      </LocationDataProvider>
    );
    
    expect(screen.getByText(/análisis de ubicaciones/i)).toBeInTheDocument();
    expect(screen.getByText(/índice de salud/i)).toBeInTheDocument();
    expect(screen.getByText(/eficiencia/i)).toBeInTheDocument();
  });

  it('displays charts and metrics', () => {
    render(
      <LocationDataProvider>
        <Analysis />
      </LocationDataProvider>
    );
    
    expect(screen.getByText(/distribución por departamento/i)).toBeInTheDocument();
  });
});