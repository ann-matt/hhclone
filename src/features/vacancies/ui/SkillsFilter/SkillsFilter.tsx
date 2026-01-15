import { useState} from 'react';
import type { KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Paper, Group, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { PillsInput, Pill } from '@mantine/core';
import type { RootState, AppDispatch } from '@/store/store';
import { addSkill, removeSkill, fetchVacancies } from '@/features/vacancies/model/vacanciesSlice';

export function SkillsFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector((state: RootState) => state.vacancies.skills);

  const [value, setValue] = useState('');

  const normalized = value.trim();

  const handleAdd = () => {
    if (!normalized) return;
    dispatch(addSkill(normalized));
    setValue('');

    // перезагрузим список с новыми skills
    dispatch(fetchVacancies());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (skill: string) => {
    dispatch(removeSkill(skill));
    dispatch(fetchVacancies());
  };

  return (
    <Paper w={317} p={24} radius="md" shadow="xs">
      <Text fw={600} mb="sm">
        Ключевые навыки
      </Text>

      <Group justify="space-between" mb="sm">
        <PillsInput radius="md">
        <Pill.Group>


          <PillsInput.Field
            placeholder="Навык"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onKeyDown={handleKeyDown}

          />
        </Pill.Group>


      </PillsInput>
        <Button p={5}
           radius="md"
          bg="#228be6ad"
          c="white"
          onClick={handleAdd}
          disabled={!normalized}
        >
          <IconPlus size={34} stroke={2} />
        </Button>
      </Group>
      <Group>
           {skills.map((skill) => (
            <Pill
            bg="gray.0"
              key={skill}
              withRemoveButton
              onRemove={() => handleRemove(skill)}
            >
              {skill}
            </Pill>
          ))}

      </Group>
    </Paper>
  );
}