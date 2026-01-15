import { Select, Paper } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { setArea, fetchVacancies } from '@/features/vacancies/model/vacanciesSlice';
import {IconMapPin} from '@tabler/icons-react';

export default function AreaSelect() {
  const dispatch = useDispatch<AppDispatch>();
  const area = useSelector((state: RootState) => state.vacancies.area);

  const handleChange = (value: string | null) => {
    dispatch(setArea(value === 'all' ? null : value));
    dispatch(fetchVacancies());
  };

  return (
    <Paper shadow="xs" radius="md" p={24} w={317}>
      <Select style={{color:"gray"}}
        placeholder="Все города"
        searchable
        value={area ?? 'all'}
        onChange={handleChange}
        data={[
          { value: 'all', label: 'Все города' },
          { value: '1', label: 'Москва' },
          { value: '2', label: 'Санкт-Петербург' },
        ]}
        leftSection={<IconMapPin size={18} style={{color: "gray"}}/>}
      />
    </Paper>
  );
}