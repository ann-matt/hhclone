import { createSlice, createAsyncThunk, type PayloadAction  } from '@reduxjs/toolkit';
import type { EmploymentType, VacancyDetails } from './types';
import type { RootState } from '@/store/store';




type VacanciesState = {
  items: VacancyDetails[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  skills: string[];
  area: string | null;
};

const initialState: VacanciesState = {
  items: [],
  status: 'idle',
  error: null,
  skills: ['TypeScript', 'React', 'Redux'],
  area: null, 
};

/* const HH_URL =
  'https://api.hh.ru/vacancies?industry=7&professional_role=96'; */
const BASE_URL = 'https://api.hh.ru/vacancies';

export const fetchVacancies = createAsyncThunk<VacancyDetails[], void, {state: RootState}>(
    'vacancies/fetchVacancies',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
    const skills = state.vacancies.skills;
    const area = state.vacancies.area;

    const params = new URLSearchParams();
    params.set('industry', '7');
    params.set('professional_role', '96');


    if (skills.length) {
  params.set('text', skills.join(' '));
}
    if (area) {

  params.set('area', area); 
}

    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    const items: VacancyDetails[] = data.items.map((v: any) => {

      const formats: string[] = v.work_format?.map((f: any) => f.id) ?? [];


      let employmentType: EmploymentType;

      if (formats.includes('REMOTE') && !formats.includes('ON_SITE')) {

        employmentType = 'можно удалённо';
      } else if (
        formats.includes('REMOTE') &&
        formats.includes('ON_SITE')
      ) {
        employmentType = 'гибрид';
      } else {
        employmentType = 'офис';
      }

      return {
        id: v.id,
        title: v.name,
        salary: v.salary
          ? `${v.salary.from ?? ''}–${v.salary.to ?? ''} ${v.salary.currency}`
          : 'по договорённости',
        experience: v.experience?.name ?? '',
        companyName: v.employer?.name ?? '',
        city: v.area?.name ?? '',
        employmentType, 

        companyDescription:
          v.snippet?.requirement ?? 'Описание компании появится позже',
        projectDescription:
          v.snippet?.responsibility ?? 'Описание проекта появится позже',
      };
    });

    return items;
  }
);

    export const fetchVacancyById = createAsyncThunk<VacancyDetails, string>(
        'vacancies/fetchVacancyById',
        async(id) => {
            const resp = await fetch(`https://api.hh.ru/vacancies/${id}`);
            if(!resp.ok) {
                throw new Error("Error")
            }

            const vac = await resp.json();

            const vacancy: VacancyDetails = {
                id: vac.id,
                title: vac.name,
                salary: vac.salary ? `${vac.salary.from ?? ''}-${vac.salary.to ?? ""} ${vac.salary.currency}`
                : 'по договорённости',

                experience: vac.experience?.name ?? '',
                companyName: vac.employer?.name ?? '',
                city: vac.area?.name ?? '',
                employmentType: vac.work_format?.[0]?.name ?? 'офис',

                companyDescription: vac.employer?.description ?? "",
                projectDescription: vac.description ?? '',

            }
            return vacancy;
        }
    )




const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    addSkill(state, action: PayloadAction<string>) {
      const s = action.payload.trim();
      if (!s) return;
      if (!state.skills.includes(s)) {
        state.skills.push(s);
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((x) => x !== action.payload);
    },
    setArea(state, action: PayloadAction<string | null>) {
  state.area = action.payload;
}
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Ошибка загрузки вакансий';
      });

      builder
      .addCase(fetchVacancyById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVacancyById.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const updated = action.payload;
        const index = state.items.findIndex((v) => v.id === updated.id);

        if (index >= 0) {
          state.items[index] = updated;
        } else {
          state.items.push(updated);
        }
      })
      .addCase(fetchVacancyById.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ?? 'Ошибка загрузки детальной вакансии';
      });
  },
});

export const { addSkill, removeSkill, setArea } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
