import { Container, Group, Text, Image, Box } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/image2.svg';
import { IconUserCircle } from '@tabler/icons-react';



function NavItem({ label, to }: { label: string; to: string }) {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Group gap={6} style={{ cursor: 'pointer' }}>
          <Text size="sm" fw={isActive ? 600 : 400} c={isActive ? 'black' : 'gray.6'}>
            {label}
          </Text>

          {isActive && (
            <Box
              w={6}
              h={6}
              style={{ borderRadius: '50%' }}
              bg="brand.6"
            />
          )}
        </Group>
      )}
    </NavLink>
  );
}

export default function Header() {
  return (
        <Box
      bg="white"
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-1)',
      }}
    >
       <Container size={1440}  py={20}>
      <Group h="100%" justify="space-between">
        <Group gap="xs">
          <Image src={logo} alt="HH clone logo" w={30} h={30} />
          <Text fw={700} size="lg">
            .FrontEnd
          </Text>
        </Group>

        <Group gap="xl">
          <NavItem label="Вакансии FE" to="/vacancies" />
          <Group justify="flex-start" gap={4}>
            <IconUserCircle size={24} stroke={1}/>
            <NavItem label="Обо мне" to="/about" ></NavItem>
            
          </Group>
          
        </Group>

        <Group></Group>
      </Group>
    </Container>
    </Box>
    
   
  );
}