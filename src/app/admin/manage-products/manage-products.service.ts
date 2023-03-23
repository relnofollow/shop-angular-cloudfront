import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url) =>
        this.http.put(url, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const url = this.getUrl('import', 'import');

    const basicAuth = this.getBasicAuth();

    return this.http.get(url, {
      params: {
        name: fileName,
      },
      responseType: 'text',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: new HttpHeaders(basicAuth ? { Authorization: basicAuth } : {}),
    });
  }

  private getBasicAuth(): string | null {
    const authorizationToken =
      localStorage.getItem('authorization_token') || '';

    if (!authorizationToken) {
      return null;
    }

    const C_USERNAME = 'relnofollow';
    const base64Credentials = btoa(`${C_USERNAME}:${authorizationToken}`);
    return `Basic ${base64Credentials}`;
  }
}
