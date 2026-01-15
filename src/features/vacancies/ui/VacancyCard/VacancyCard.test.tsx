import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import VacancyCard from './VacancyCard';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

const renderWithMantine = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <MantineProvider>{ui}</MantineProvider>
    </MemoryRouter>
  );
};

describe('VacancyCard', () => {
  const baseProps = {
    id: '123',
    title: 'Frontend Developer',
    salary: '100–200',
    experience: '1–3 года',
    companyName: 'Some Company',
    city: 'Москва',
    employmentType: 'офис' as const,
  };

  it('рендерит title, salary, exp, company, city', () => {
    renderWithMantine(<VacancyCard {...baseProps} />);

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('100–200 ₽')).toBeInTheDocument();
    expect(screen.getByText('Опыт 1–3 года')).toBeInTheDocument();
    expect(screen.getByText('Some Company')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });
});