import { Card, Text, Badge, Group, Stack, Box, Flex } from '@mantine/core';

import ApplyButton from '@/shared/components/ApplyButton';
import type { VacancyListItem } from '@/features/vacancies/model/types';

type Props = VacancyListItem;



export default function VacancyShortCard({title, salary, experience, companyName, city, employmentType}: Props){

    return (
    <Card shadow="sm" radius="md" ta="left" w={660} h={250} p={24} mt={24}>
      <Stack gap={16}>
        <Box>
          <Text c="brand.6" fw={700} >
            {title}
          </Text>
          <Group gap="sm">
            <Text>{salary} ₽</Text>
            <Text c="gray.4">Опыт {experience}</Text>
          </Group>
        </Box>

        <Flex direction="column" gap="xs">
            <Text c="gray.4">{companyName}</Text>
            {employmentType === 'офис' && (
                <Badge color="gray" radius="xs" h={16}>
                офис
                </Badge>
                )  
            }
            {employmentType === 'гибрид' && (
                <Badge color="black" radius="xs" h={16}>
                гибрид
                </Badge>
                )  
            }
            {employmentType === 'можно удалённо' && (
                <Badge color="blue" radius="xs" h={16}>
                можно удалённо
                </Badge>
                )  
            }

            <Text>{city}</Text>
        </Flex>

        <Group gap={24}>
          <ApplyButton />
        </Group>
      </Stack>
    </Card>
  );
}