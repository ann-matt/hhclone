import VacancyCard from "@/features/vacancies/ui/VacancyCard/VacancyCard";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { fetchVacancies } from '@/features/vacancies/model/vacanciesSlice';
import { useEffect, useMemo, useState } from "react";
import { Loader,Center, Alert, Group, Stack, Container, Box, Pagination } from "@mantine/core";

import { SubHeader } from "@/features/vacancies/ui/SubHeader/SubHeader";
import { SkillsFilter } from "@/features/vacancies/ui/SkillsFilter/SkillsFilter";
import AreaSelect from "@/features/vacancies/ui/AreaSelect/AreaSelect";

const PER_PAGE = 10;


export default function Vacancies() {
  const dispatch = useDispatch<AppDispatch>();

  const {items, status, error } = useSelector((state: RootState) => state.vacancies);

   const [page, setPage] = useState(1);

  useEffect(() => {
    if (status === 'idle'){
      dispatch(fetchVacancies());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [items.length]);

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return items.slice(start, start + PER_PAGE);
  }, [items, page]);

  if (status === 'loading') {
    return <Center> <Loader/> </Center>
  }
  if (status === 'succeeded' && items.length === 0) {
  return <p>Пока нет подходящих вакансий</p>;
  }

  if (status === 'failed'){
    return <Alert>{error}</Alert>
  }


  return (
    <>
    <Box bg="gray.0">
      <SubHeader/>


      <Container size={1024} mt={24}>
        <Group
          align="flex-start"
          justify="space-between"
        >
          <Stack gap="md" w={280}>
            <SkillsFilter />
            <AreaSelect />
          </Stack>

          <Stack gap="md" w={660}>
            {pageItems.map((v) => (
              <VacancyCard key={v.id} {...v} />
            ))}

            {items.length > PER_PAGE && (
              <Center mt="md">
                <Pagination value={page} onChange={setPage} total={totalPages} />
              </Center>
            )}


          </Stack>
        </Group>
      </Container>
    
    </Box>
    

    </>
  );
}

