import { useParams } from "react-router-dom";

import {Flex} from '@mantine/core';
import { VacancyDetailsCard } from "@/features/vacancies/ui/VacancyDetailsCard/VacancyDetailsCard";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { useEffect } from "react";
import { fetchVacancyById } from "@/features/vacancies/model/vacanciesSlice";
import { Loader, Center } from "@mantine/core";
import VacancyShortCard from "@/features/vacancies/ui/VacancyShortCard/VacancyShortCard";


export default function VacancyPage() {
    const {id} = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const {items, status, error} = useSelector((state: RootState) => state.vacancies);

 useEffect(() => {
    if (!id) return;
    dispatch(fetchVacancyById(id));
  }, [id, dispatch]);

  if(status === 'loading') {
    return <Center><Loader></Loader></Center>
  }

  if(status === 'failed'){
    return <h1>{error}</h1>
  }

  const vacancy = items.find((v) => v.id === id);

  if(!vacancy) {
    return <h1>Нет вакансии</h1>
  }

    return (<>
    <Flex justify="center" align="center" direction="column" wrap="wrap" bg="gray.0" >
        <VacancyShortCard {...vacancy}/>
        <VacancyDetailsCard
        projectDescription={vacancy.projectDescription} 
        companyDescription={vacancy.companyDescription} />
    </Flex>
    
      </>
    )

    
};
