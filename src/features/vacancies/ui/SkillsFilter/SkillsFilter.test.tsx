import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { SkillsFilter } from './SkillsFilter';

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
  return render(<MantineProvider>{ui}</MantineProvider>);
};

const mockDispatch = vi.fn();

let mockState: any = {
  vacancies: { skills: ['React', 'TypeScript'] },
};

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: any) => selector(mockState),
}));

const addSkillMock = vi.fn((payload: string) => ({
  type: 'vacancies/addSkill',
  payload,
}));

const removeSkillMock = vi.fn((payload: string) => ({
  type: 'vacancies/removeSkill',
  payload,
}));

const fetchVacanciesMock = vi.fn(() => ({
  type: 'vacancies/fetchVacancies',
}));

vi.mock('@/features/vacancies/model/vacanciesSlice', () => ({
  addSkill: (payload: string) => addSkillMock(payload),
  removeSkill: (payload: string) => removeSkillMock(payload),
  fetchVacancies: () => fetchVacanciesMock(),
}));

describe('SkillsFilter', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    addSkillMock.mockClear();
    removeSkillMock.mockClear();
    fetchVacanciesMock.mockClear();

    mockState = { vacancies: { skills: ['React', 'TypeScript'] } };
  });

  it('рендерит заголовок и инпут с placeholder "Навык"', () => {
    renderWithMantine(<SkillsFilter />);

    expect(screen.getByText('Ключевые навыки')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument();
  });

  it('рендерит pills из skills', () => {
    renderWithMantine(<SkillsFilter />);

    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
  });



  it('по Enter добавляет навык и вызывает fetchVacancies', () => {
    renderWithMantine(<SkillsFilter />);

    const input = screen.getAllByPlaceholderText('Навык')[0] as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Next.js' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(addSkillMock).toHaveBeenCalledWith('Next.js');
    expect(fetchVacanciesMock).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('если value пустой, addSkill не вызывается (и fetchVacancies тоже)', () => {
    renderWithMantine(<SkillsFilter />);

    const input = screen.getAllByPlaceholderText('Навык')[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(addSkillMock).not.toHaveBeenCalled();
    expect(fetchVacanciesMock).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });


});