import {Route, Routes} from 'react-router-dom';
import NoMatchPage from '../pages/no-match-page';
import VacancyPage from '../pages/vacancy-page';
import Vacancies from '../pages/vacancies';
import About from '@/pages/about';

const AppRoutes = () => {
    const navigationRoutes = [
        {path: '/vacancies', element: <Vacancies/>},
        {path:'/', element: <Vacancies/>},
        {path: '*', element: <NoMatchPage/>},
        {path: '/about', element: <About/>},
        {path: '/vacancies/:id', element:<VacancyPage/>}
    ]
    return <Routes>{navigationRoutes.map((route) => (<Route key={route.path} path={route.path} element = {route.element}/>))}</Routes>
};

export default AppRoutes;