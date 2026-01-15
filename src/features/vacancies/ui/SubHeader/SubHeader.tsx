import { Container, Group, Text, Stack, Box } from '@mantine/core';
import { Input } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';


export const SubHeader = () => {
    return(<>
    <Box
      bg="gray.0"
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-1)',
      }}
    >
        <Container size={1024} p={20} >
      <Group h="100%" justify="space-between" align="center">
        <Stack gap={4}>

          <Text fw={700} size="xl">
            Список вакансий
          </Text>
          <Text c="gray.4" variant="light">по профессии Frontend-разработчик</Text>
        </Stack>

        <Group>
            <Input  placeholder="Должность или название компании" w={400}  leftSection={<IconSearch size={16} />} ></Input>
            <Button bg="brand.6" variant="filled" fw={500}>Найти</Button>
        </Group>
      </Group>
    </Container>
    </Box>
    
    
    </>)
}