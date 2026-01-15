import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest';
import AreaSelect from './AreaSelect';

const mockDispatch = vi.fn();

const mockUseSelector = vi.fn();
vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: (fn: any) => mockUseSelector(fn),
  };
});

const setAreaMock = vi.fn((payload: string | null) => ({ type: 'vacancies/setArea', payload }));
const fetchVacanciesMock = vi.fn(() => ({ type: 'vacancies/fetchVacancies' }));

vi.mock('@/features/vacancies/model/vacanciesSlice', () => ({
  setArea: (payload: string | null) => setAreaMock(payload),
  fetchVacancies: () => fetchVacanciesMock(),
}));

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
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (window as any).ResizeObserver = ResizeObserverMock;
  (globalThis as any).ResizeObserver = ResizeObserverMock;


const renderWithMantine = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('AreaSelect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерит placeholder "Все города" когда area = null', () => {
    mockUseSelector.mockImplementation((selectorFn: any) =>
      selectorFn({ vacancies: { area: null } })
    );

    renderWithMantine(<AreaSelect />);

    expect(screen.getAllByText('Все города').length).toBeGreaterThan(0);
  });

});