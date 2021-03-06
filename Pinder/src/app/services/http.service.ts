import {HTTP} from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { environment } from '../config/environment';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HTTP,
    private fileTransfer: FileTransfer
    ) {}
  post(serviceName: string, data: any, header:any){
    const url = environment.apiUrl + serviceName;
    const headers = header;
    return this.http.post(url, data, headers);
  }
  get(serviceName: string, data:any, header: any ){
    const url = environment.apiUrl + serviceName;
    const headers = header;
    return this.http.get(url, data, headers);
  }
  async postFile(serviceName: string, fileKey: string, data:any, header:any){
    
    try{
      const url = environment.apiUrl + serviceName;
      let fileName = data.substr(data.lastIndexOf('/') + 1);
      const options: FileUploadOptions = {
        fileKey: fileKey,
        fileName: fileName,
        headers: header,
        httpMethod: 'POST'
      };
      const fileTransfer = this.fileTransfer.create();
      const response = await fileTransfer.upload(data, url, options);
      return response;
    }
    catch(error){
      return error;
    }
  }
}
