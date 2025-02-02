import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IDepartmentDTO } from "src/app/interfaces/department.interfaces";

/** Сервис для получения данных департаментов с бэкенда */
@Injectable({
  providedIn: "root",
})
export class DepartmentDataService {
  /**
   * Получает список отделов.
   * @returns Observable массив IDepartmentDTO.
   */
  getDepartments(): Observable<IDepartmentDTO[]> {
    const mockDepartments: IDepartmentDTO[] = [
      {
        nodeId: "51af343b-2cde-45a1-b6c7-5e7f8c9d1b2a",
        name: "Центральный офис",
        hierarchyLevel: 0,
        positions: [
          {
            nodeId: "3cbb2232-1edf-4b90-a2a8-934f4d6f8b3a",
            firstName: "Иван",
            lastName: "Иванов",
            middleName: "Владимирович",
            position: "Генеральный директор",
            parentNodeId: "51af343b-2cde-45a1-b6c7-5e7f8c9d1b2a",
            headOfDepartment: true,
            email: "i.ivanov@outlook.com",
            hireDate: new Date("2010-01-01"),
            salary: 2000000,
          },
        ],
        subDepartments: [
          {
            nodeId: "a3d2e4f5-6b7a-41c3-92d8-034e7f8b5a1d",
            name: "Департамент проектов",
            hierarchyLevel: 1,
            subDepartments: [
              {
                nodeId: "b4c5d6e7-8f9a-43b2-81e6-7f3a2d9c8b1a",
                name: "Разработка",
                hierarchyLevel: 2,
                positions: [
                  {
                    nodeId: "5dde6724-2ed1-4e2b-9da9-47e2acb7c245",
                    firstName: "Анна",
                    lastName: "Петрова",
                    middleName: "Олеговна",
                    position: "CTO",
                    parentNodeId: "b4c5d6e7-8f9a-43b2-81e6-7f3a2d9c8b1a",
                    headOfDepartment: true,
                    email: "a.petrova@outlook.com",
                    hireDate: new Date("2015-03-20"),
                    salary: 1500000,
                  },
                  {
                    nodeId: "a3f9c8b4-4e7f-40b2-a5e2-7b9c7f6d9d34",
                    firstName: "Владимир",
                    lastName: "Зайцев",
                    middleName: "Александрович",
                    position: "Главный архитектор",
                    parentNodeId: "b4c5d6e7-8f9a-43b2-81e6-7f3a2d9c8b1a",
                    headOfDepartment: false,
                    email: "v.zaicev@outlook.com",
                    hireDate: new Date("2020-07-12"),
                    salary: 950000,
                  },
                ],
                subDepartments: [
                  {
                    nodeId: "e1f2a3b4-5c6d-47e8-92b3-8a4d6f5b9c1e",
                    name: "Команда React",
                    hierarchyLevel: 3,
                    positions: [
                      {
                        nodeId: "7aae9880-3f4c-40c0-873f-2d98346a2f55",
                        firstName: "Елена",
                        lastName: "Смирнова",
                        middleName: "Григорьевна",
                        position: "Руководитель разработки",
                        parentNodeId: "e1f2a3b4-5c6d-47e8-92b3-8a4d6f5b9c1e",
                        headOfDepartment: true,
                        email: "e.smirnova@outlook.com",
                        hireDate: new Date("2019-08-15"),
                        salary: 1200000,
                      },
                      {
                        nodeId: "f4b7c8e9-5d8a-4b7c-8a8b-9c9a7d6f0e12",
                        firstName: "Максим",
                        lastName: "Сергеев",
                        middleName: "Дмитриевич",
                        position: "Главный аналитик",
                        parentNodeId: "e1f2a3b4-5c6d-47e8-92b3-8a4d6f5b9c1e",
                        headOfDepartment: false,
                        email: "m.sergeev@outlook.com",
                        hireDate: new Date("2021-12-01"),
                        salary: 940000,
                      },
                      {
                        nodeId: "2bb52508-0dfd-4d60-b310-d472f3f8465d",
                        firstName: "Алексей",
                        lastName: "Кузнецов",
                        middleName: "Антонович",
                        position: "Ведущий фронтенд разработчик",
                        parentNodeId: "e1f2a3b4-5c6d-47e8-92b3-8a4d6f5b9c1e",
                        headOfDepartment: false,
                        email: "a.kuznetsov@outlook.com",
                        hireDate: new Date("2023-01-14"),
                        salary: 510000,
                      },
                      {
                        nodeId: "60b18b29-3b2f-4e8e-b5e9-0f4a0dd61242",
                        firstName: "Мария",
                        lastName: "Иванова",
                        middleName: "Дмитриевна",
                        position: "Младший фронтенд разработчик",
                        parentNodeId: "e1f2a3b4-5c6d-47e8-92b3-8a4d6f5b9c1e",
                        headOfDepartment: false,
                        email: "m.ivanova@outlook.com",
                        hireDate: new Date("2024-01-09"),
                        salary: 180000,
                      },
                      {
                        nodeId: "a9b4c8d1-6f7a-47e3-b4c2-6b7d3f8e9e23",
                        firstName: "Владислав",
                        lastName: "Морозов",
                        middleName: "Дмитриевич",
                        position: "Ведущий бэкенд разработчик C#",
                        parentNodeId: "e1f2a3b4-5c6d-47e8-92b3-8a4d6f5b9c1e",
                        headOfDepartment: false,
                        email: "v.morozov@outlook.com",
                        hireDate: new Date("2021-03-13"),
                        salary: 860000,
                      },
                      {
                        nodeId: "b7c9d8e3-5d6a-42e5-b7c8-9c7a6e0f1e89",
                        firstName: "Роман",
                        lastName: "Григорьев",
                        middleName: "Викторович",
                        position: "Младший бэкенд разработчик C#",
                        parentNodeId: "e1f2a3b4-5c6d-47e8-92b3-8a4d6f5b9c1e",
                        headOfDepartment: false,
                        email: "r.grigoryev@outlook.com",
                        hireDate: new Date("2024-04-01"),
                        salary: 150000,
                      },
                      {
                        nodeId: "d2b4f8c7-4e5d-46c2-bf56-7c8a7e2b5f89",
                        firstName: "Андрей",
                        lastName: "Ковалев",
                        middleName: "Игоревич",
                        position: "Ведущий тестировщик",
                        parentNodeId: "e1f2a3b4-5c6d-47e8-92b3-8a4d6f5b9c1e",
                        headOfDepartment: false,
                        email: "a.kovalev@outlook.com",
                        hireDate: new Date("2023-01-20"),
                        salary: 350000,
                      },
                    ],
                  },
                  {
                    nodeId: "c2d3e4f5-6a7b-48c1-92e5-7b3a1d6c8f5e",
                    name: "Команда Angular",
                    hierarchyLevel: 3,
                    positions: [
                      {
                        nodeId: "addf4032-ffe6-47d4-8124-d4a776979919",
                        firstName: "Наталья",
                        lastName: "Соколова",
                        middleName: "Сергеевна",
                        position: "Руководитель разработки",
                        parentNodeId: "c2d3e4f5-6a7b-48c1-92e5-7b3a1d6c8f5e",
                        headOfDepartment: true,
                        email: "n.sokolova@outlook.com",
                        hireDate: new Date("2023-11-15"),
                        salary: 1200000,
                      },
                      {
                        nodeId: "e5d8c8b4-4f9f-43d2-a2e3-8c9b8e7f0d45",
                        firstName: "Геннадий",
                        lastName: "Морозов",
                        middleName: "Петрович",
                        position: "Главный аналитик",
                        parentNodeId: "c2d3e4f5-6a7b-48c1-92e5-7b3a1d6c8f5e",
                        headOfDepartment: true,
                        email: "g.morozov@outlook.com",
                        hireDate: new Date("2024-02-15"),
                        salary: 700000,
                      },
                      {
                        nodeId: "6152b073-d507-48e4-87ea-e9202f94dd0d",
                        firstName: "Александр",
                        lastName: "Васильев",
                        middleName: "Николаевич",
                        position: "Ведущий фронтенд разработчик",
                        parentNodeId: "c2d3e4f5-6a7b-48c1-92e5-7b3a1d6c8f5e",
                        headOfDepartment: false,
                        email: "a.vasilyev@outlook.com",
                        hireDate: new Date("2024-02-14"),
                        salary: 540000,
                      },
                      {
                        nodeId: "a60b17fb-0f14-464f-9a60-1d6d4dd28cb9",
                        firstName: "Виктор",
                        lastName: "Семенов",
                        middleName: "Павлович",
                        position: "Ведущий фронтенд разработчик",
                        parentNodeId: "c2d3e4f5-6a7b-48c1-92e5-7b3a1d6c8f5e",
                        headOfDepartment: false,
                        email: "v.semenov@outlook.com",
                        hireDate: new Date("2023-05-10"),
                        salary: 420000,
                      },
                      {
                        nodeId: "d6e7c9a1-4f8a-43e2-a1d4-5c8b9e1a8f78",
                        firstName: "Ольга",
                        lastName: "Петрова",
                        middleName: "Александровна",
                        position: "Ведущий бэкенд разработчик PHP",
                        parentNodeId: "c2d3e4f5-6a7b-48c1-92e5-7b3a1d6c8f5e",
                        headOfDepartment: false,
                        email: "o.petrova@outlook.com",
                        hireDate: new Date("2022-06-18"),
                        salary: 750000,
                      },
                      {
                        nodeId: "a8b7c9d3-1f6a-47e1-b7c6-9c7b8e2f5e12",
                        firstName: "Александр",
                        lastName: "Смирнов",
                        middleName: "Владимирович",
                        position: "Бэкенд разработчик PHP",
                        parentNodeId: "c2d3e4f5-6a7b-48c1-92e5-7b3a1d6c8f5e",
                        headOfDepartment: false,
                        email: "a.smirnov@outlook.com",
                        hireDate: new Date("2023-05-15"),
                        salary: 370000,
                      },
                      {
                        nodeId: "f7a8c9d3-6e0a-4b2c-91d5-1b6a7c8e9f76",
                        firstName: "Екатерина",
                        lastName: "Новикова",
                        middleName: "Игоревна",
                        position: "Ведущий тестировщик",
                        parentNodeId: "c2d3e4f5-6a7b-48c1-92e5-7b3a1d6c8f5e",
                        headOfDepartment: false,
                        email: "e.novikova@outlook.com",
                        hireDate: new Date("2022-11-20"),
                        salary: 470000,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            nodeId: "d4e5f6a7-8b9c-41b2-93a5-6f7e8c5d3a1b",
            name: "Департамент развития",
            hierarchyLevel: 1,
            positions: [
              {
                nodeId: "b7d8c9a5-3e6a-47e2-a5c7-8c9b8e3f5d67",
                firstName: "Максим",
                lastName: "Абрамов",
                middleName: "Иванович",
                position: "Директор по маркетингу",
                parentNodeId: "d4e5f6a7-8b9c-41b2-93a5-6f7e8c5d3a1b",
                headOfDepartment: true,
                email: "m.abramov@outlook.com",
                hireDate: new Date("2023-06-05"),
                salary: 600000,
              },
            ],
            subDepartments: [
              {
                nodeId: "e5f6a7b8-9c1d-42b3-83e7-4a5d6f2c9b1e",
                name: "Отдел SEO",
                hierarchyLevel: 2,
                positions: [
                  {
                    nodeId: "e6d8c9a7-3f5a-41d2-b8c7-9c8b8e2f7d89",
                    firstName: "Анастасия",
                    lastName: "Кравцова",
                    middleName: "Владимировна",
                    position: "SEO-аналитик",
                    parentNodeId: "e5f6a7b8-9c1d-42b3-83e7-4a5d6f2c9b1e",
                    headOfDepartment: false,
                    email: "a.kravtsova@outlook.com",
                    hireDate: new Date("2024-08-15"),
                    salary: 370000,
                  },
                  {
                    nodeId: "f9d8c7b4-3a5b-49d3-c7a8-8b9e8e7f6d12",
                    firstName: "Светлана",
                    lastName: "Ефимова",
                    middleName: "Андреевна",
                    position: "SEO-специалист",
                    parentNodeId: "e5f6a7b8-9c1d-42b3-83e7-4a5d6f2c9b1e",
                    headOfDepartment: false,
                    email: "s.efimova@outlook.com",
                    hireDate: new Date("2024-09-20"),
                    salary: 280000,
                  },
                  {
                    nodeId: "c7e8d9a6-4b5a-41d2-b8f8-9b9e9e1f6c34",
                    firstName: "Дмитрий",
                    lastName: "Орлов",
                    middleName: "Викторович",
                    position: "SEO-специалист",
                    parentNodeId: "e5f6a7b8-9c1d-42b3-83e7-4a5d6f2c9b1e",
                    headOfDepartment: false,
                    email: "d.orlov@outlook.com",
                    hireDate: new Date("2024-10-15"),
                    salary: 220000,
                  },
                ],
              },
              {
                nodeId: "a6b7c8d9-1e2f-43b4-82c6-3f4a7d5e9b2c",
                name: "Команда контента",
                hierarchyLevel: 2,
                positions: [
                  {
                    nodeId: "d7e8c9b5-2f6a-47b2-c5d8-8b9e8e2f6e23",
                    firstName: "Илья",
                    lastName: "Воронов",
                    middleName: "Сергеевич",
                    position: "Контент-менеджер",
                    parentNodeId: "a6b7c8d9-1e2f-43b4-82c6-3f4a7d5e9b2c",
                    headOfDepartment: true,
                    email: "i.voronov@outlook.com",
                    hireDate: new Date("2023-07-10"),
                    salary: 290000,
                  },
                  {
                    nodeId: "d9f8c7e4-3a5b-49e2-c7a8-8b9e9f6d7e23",
                    firstName: "Николай",
                    lastName: "Петров",
                    middleName: "Александрович",
                    position: "Копирайтер",
                    parentNodeId: "a6b7c8d9-1e2f-43b4-82c6-3f4a7d5e9b2c",
                    headOfDepartment: false,
                    email: "n.petrov@outlook.com",
                    hireDate: new Date("2024-11-10"),
                    salary: 250000,
                  },
                  {
                    nodeId: "e8d9f7b6-4c5a-42e2-b9c7-9d9e7e1f7d23",
                    firstName: "Вероника",
                    lastName: "Павленко",
                    middleName: "Олеговна",
                    position: "Редактор",
                    parentNodeId: "a6b7c8d9-1e2f-43b4-82c6-3f4a7d5e9b2c",
                    headOfDepartment: false,
                    email: "v.pavlenko@outlook.com",
                    hireDate: new Date("2022-12-12"),
                    salary: 300000,
                  },
                ],
              },
              {
                nodeId: "f7a8b9c1-2d3e-45b6-91c8-2e5d6f7a3b4c",
                name: "Отдел контекстной рекламы",
                hierarchyLevel: 2,
                positions: [
                  {
                    nodeId: "f9d8b6e4-2c5b-41e3-b6a8-9d9f9f6c7d45",
                    firstName: "Полина",
                    lastName: "Сидорова",
                    middleName: "Андреевна",
                    position: "Аналитик",
                    parentNodeId: "f7a8b9c1-2d3e-45b6-91c8-2e5d6f7a3b4c",
                    headOfDepartment: true,
                    email: "p.sidorova@outlook.com",
                    hireDate: new Date("2023-10-25"),
                    salary: 400000,
                  },
                  {
                    nodeId: "h8d9b5e3-2c5a-41e4-b7a8-9c8f9e7d7e56",
                    firstName: "Алиса",
                    lastName: "Иванова",
                    middleName: "Владимировна",
                    position: "PPC-специалист",
                    parentNodeId: "f7a8b9c1-2d3e-45b6-91c8-2e5d6f7a3b4c",
                    headOfDepartment: false,
                    email: "a.ivanova@outlook.com",
                    hireDate: new Date("2024-09-15"),
                    salary: 220000,
                  },
                  {
                    nodeId: "i8e9b5d4-2b5a-41e5-c7b8-9c7f8e6d7f45",
                    firstName: "Марина",
                    lastName: "Кузнецова",
                    middleName: "Алексеевна",
                    position: "PPC-менеджер",
                    parentNodeId: "f7a8b9c1-2d3e-45b6-91c8-2e5d6f7a3b4c",
                    headOfDepartment: false,
                    email: "m.kuznetsova@outlook.com",
                    hireDate: new Date("2024-08-25"),
                    salary: 200000,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        nodeId: "b8c9d1e2-3f4a-46b5-82e7-1a2d5c6f9b3a",
        name: "Филиал в Санкт-Петербурге",
        hierarchyLevel: 0,
        subDepartments: [
          {
            nodeId: "1a2b3c4d-5e6f-47a8-91b2-3c4d5e6f7a8b",
            name: " Департамент клиентского обслуживания",
            hierarchyLevel: 1,
            positions: [
              {
                nodeId: "a4b6c8e2-3b2f-4894-a684-6b7d84c2eabc",
                firstName: "Алексей",
                lastName: "Кузнецов",
                middleName: "Иванович",
                position: "Руководитель клиентского обслуживания",
                parentNodeId: "1a2b3c4d-5e6f-47a8-91b2-3c4d5e6f7a8b",
                headOfDepartment: true,
                email: "a.kuznetsov@outlook.com",
                hireDate: new Date("2018-05-10"),
                salary: 1100000,
              },
            ],
            subDepartments: [
              {
                nodeId: "2b3c4d5e-6f7a-48b9-82c3-4d5e6f7a8b1c",
                name: "Отдел поддержки клиентов",
                hierarchyLevel: 2,
                positions: [
                  {
                    nodeId: "d2f4c9a1-5b8e-4d2b-b9a4-e8e4c2e6e9c1",
                    firstName: "Марина",
                    lastName: "Петрова",
                    middleName: "Александровна",
                    position: "Специалист поддержки клиентов",
                    parentNodeId: "2b3c4d5e-6f7a-48b9-82c3-4d5e6f7a8b1c",
                    headOfDepartment: false,
                    email: "m.petrova@outlook.com",
                    hireDate: new Date("2023-03-12"),
                    salary: 200000,
                  },
                  {
                    nodeId: "f6a8d9b3-8e2a-4b7b-9a6a-7b9f4a6b7c2e",
                    firstName: "Ксения",
                    lastName: "Зеленовская",
                    middleName: "Владимировна",
                    position: "Специалист поддержки клиентов",
                    parentNodeId: "2b3c4d5e-6f7a-48b9-82c3-4d5e6f7a8b1c",
                    headOfDepartment: false,
                    email: "k.zelenovskaya@outlook.com",
                    hireDate: new Date("2023-06-15"),
                    salary: 230000,
                  },
                ],
              },
              {
                nodeId: "3c4d5e6f-7a8b-49c1-93d4-5e6f7a8b1c2d",
                name: "Отдел работы с ключевыми клиентами",
                hierarchyLevel: 2,
                positions: [
                  {
                    nodeId: "b7f8c2d4-6a9b-4d2e-8f2a-3b9a6e7b8c1d",
                    firstName: "Дмитрий",
                    lastName: "Сидоров",
                    middleName: "Павлович",
                    position: "Менеджер по работе с ключевыми клиентами",
                    parentNodeId: "3c4d5e6f-7a8b-49c1-93d4-5e6f7a8b1c2d",
                    headOfDepartment: false,
                    email: "d.sidorov@outlook.com",
                    hireDate: new Date("2024-09-25"),
                    salary: 300000,
                  },
                  {
                    nodeId: "c8f9e3d5-7b1e-4d3a-9c2a-4e8f5b9a7b2c",
                    firstName: "Екатерина",
                    lastName: "Лебедева",
                    middleName: "Сергеевна",
                    position: "Менеджер по работе с ключевыми клиентами",
                    parentNodeId: "3c4d5e6f-7a8b-49c1-93d4-5e6f7a8b1c2d",
                    headOfDepartment: false,
                    email: "e.lebedeva@outlook.com",
                    hireDate: new Date("2021-12-10"),
                    salary: 350000,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    return of(mockDepartments); // Эмуляция асинхронного вызова
  }
}
