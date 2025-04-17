/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './services/categories.service';
import { CategoriesRepository } from './repository/categories.repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: CategoriesRepository;

  const mockQueryFilter = {
    page: 1,
    perPage: 10,
    filters: [],
    from: '',
    to: '',
  };

  const mockPaginatedResult = {
    data: [{ id: 1, name: 'Electronics' }],
    total: 1,
    page: 1,
    perPage: 10,
    meta: {
      total: 1,
      lastPage: 1,
      currentPage: 1,
      perPage: 10,
      prev: null,
      next: null,
    },
  };

  const mockCategoriesRepository: Partial<CategoriesRepository> = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: mockCategoriesRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call CategoriesRepository.findAll and return the result', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockPaginatedResult);

      const result = await service.findAll(mockQueryFilter);
      expect(repository.findAll).toHaveBeenCalledWith(mockQueryFilter);
      expect(result).toEqual(mockPaginatedResult);
    });
  });
});
