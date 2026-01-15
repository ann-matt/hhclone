import {Paper, Text, Box} from '@mantine/core';
import  type {VacancyDetails } from '../../model/types';


type Props = Pick<VacancyDetails, 'companyDescription' | 'projectDescription'>;

export function VacancyDetailsCard({companyDescription, projectDescription}: Props) {

    const hasCompany = companyDescription && companyDescription.trim() !== '';
  const hasProject = projectDescription && projectDescription.trim() !== '';

  if (!hasCompany && !hasProject) {
    return null;
  }

    return(<>
    <Paper shadow="xs" p="xl"  w={660} mt={24}>
    {hasCompany && (<>
            <Text fw={700} size="lg">
            Компания:
          </Text>
        <Box
      component="div"
      style={{ lineHeight: 1.6 }}
      dangerouslySetInnerHTML={{ __html: companyDescription }}
    /></>


      )}
    {hasProject && (
        <>
        <Text fw={700} size="lg">
            Компания:
          </Text>
        <Box
      component="div"
      style={{ lineHeight: 1.6 }}
      dangerouslySetInnerHTML={{ __html: projectDescription }}
    /></>
        
      )}

    </Paper>

    
    </>)

}