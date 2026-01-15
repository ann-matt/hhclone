import { Text, Paper, Image, Button, Stack, Flex } from '@mantine/core';
import cat from '@/assets/sad-cat.png'
import { useNavigate } from 'react-router-dom';



export default function NoMatchPage() {
    const navigate = useNavigate();
    
  return (
    <Paper shadow="xs" radius="lg" p={24} withBorder maw={607}  mx="auto" mt={24} >
        <Flex w={540} align="center" justify="space-between" mb={24} >

            <Stack maw={408}>
            <Text fw={700} fz="h2" ta="left">Упс! Такой страницы <br/> не существует</Text>
            <Text fz="sm" ta="left">Давайте перейдём к началу.</Text>
        </Stack>
        <Button px={22} onClick={() => navigate('/vacancies')}>На главную</Button>
        </Flex>

        <Image src={cat} />

    </Paper>
  );
}


