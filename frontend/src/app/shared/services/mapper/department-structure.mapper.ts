import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyApiService } from '../api/company-api.service';
import { DepartmentApiService } from '../api/department-api.service';
import { map } from 'rxjs/operators';
import { DepartmentId } from '../../model/api/department.dto';
import { CompanyId } from '../../model/api/company.dto';
import { DepartmentStructureDto } from '../../model/api/department-structure.dto';
import { DepartmentStructure } from '../../model/ui/department-structure';

@Injectable({
  providedIn: 'root'
})
export class DepartmentStructureMapper {
  constructor(private departmentApiService: DepartmentApiService, private companyApiService: CompanyApiService) {}

  getDepartmentStructureOfDepartment$(departmentId: DepartmentId): Observable<DepartmentStructure[]> {
    return this.departmentApiService
      .getDepartmentStructure$(departmentId)
      .pipe(map(dto => this.mapDepartmentStructureDtoList(dto)));
  }

  getDepartmentStructureOfCompany$(companyId: CompanyId): Observable<DepartmentStructure[]> {
    return this.companyApiService
      .getDepartmentStructureOfCompany$(companyId)
      .pipe(map(dto => this.mapDepartmentStructureDtoList(dto)));
  }

  mapDepartmentStructureDtoList(dtoList: DepartmentStructureDto[]): DepartmentStructure[] {
    const departmentStructureList: DepartmentStructure[] = [];
    if (dtoList) {
      for (const dto of dtoList) {
        departmentStructureList.push(this.mapDepartmentStructureDto(dto));
      }
    }
    departmentStructureList.sort(this.sortDepartmentStructure);

    return departmentStructureList;
  }

  sortDepartmentStructure(a: DepartmentStructure, b: DepartmentStructure): number {
    if (a.isActive > b.isActive) {
      return -1;
    }
    if (b.isActive > a.isActive) {
      return 1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  }

  mapDepartmentStructureDto(dto: DepartmentStructureDto): DepartmentStructure {
    const departmentStructure: DepartmentStructure = new DepartmentStructure(dto.id, dto.name.toString(), dto.userRole, dto.isActive);
    departmentStructure.subDepartments = this.mapDepartmentStructureDtoList(dto.subDepartments);

    return departmentStructure;
  }
}
