import { render, screen, fireEvent } from '@testing-library/react';
import { LocationForm } from '../../components/forms/LocationForm';
import { LocationDataProvider } from '../../context/LocationDataContext';
import { describe, it, expect, vi } from 'vitest';

describe('LocationForm Component', () => {
  const renderForm = () => {
    return render(
      <LocationDataProvider>
        <LocationForm />
      </LocationDataProvider>
    );
  };

  it('renders all form fields', () => {
    renderForm();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ciudad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/departamento/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderForm();
    const submitButton = screen.getByRole('button', { name: /guardar/i });
    
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/complete todos los campos/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    renderForm();
    
    fireEvent.change(screen.getByLabelText(/dirección/i), {
      target: { value: 'Calle Test 123' },
    });
    fireEvent.change(screen.getByLabelText(/ciudad/i), {
      target: { value: 'Ciudad Test' },
    });
    
    // Complete other required fields...
    
    const submitButton = screen.getByRole('button', { name: /guardar/i });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/datos guardados/i)).toBeInTheDocument();
  });
});