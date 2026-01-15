export type EmploymentType = 'офис' | 'гибрид' | 'можно удалённо';

export type VacancyListItem = {
    id: string;
    title: string;
    companyName: string;
    city: string;
    salary: string;
    experience: string;
    employmentType: EmploymentType;
};

export type VacancyDetails = VacancyListItem & {
    companyDescription: string;
    projectDescription: string;
}