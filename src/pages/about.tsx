import { Text, Paper } from '@mantine/core';

const aboutMe = {
    name: "Иван Васильев",
    description: "Привет! Я — Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit."
}


export default function About() {
  return (
    <Paper shadow="xs" radius="lg" p={24} withBorder maw={660} mx="auto" mt={24} >
      <Text fw={700} fz="h2" ta="left">{aboutMe.name}</Text>
      <Text fz="sm" ta="left">
        {aboutMe.description}

      </Text>
    </Paper>
  );
}