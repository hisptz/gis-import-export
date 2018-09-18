import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import * as Fuse from 'fuse.js';

/*Stores main API*/
const ORG_UNIT_API = '/api/26/organisationUnits.json';
const TEST_API = 'https://my-json-server.typicode.com/vmataba/json/db';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    /*Stores File to be uploaded*/
    file_to_upload: File = null;
    /*Keeps Matching Scheme*/
    match_option = 'Name';
    /**Stores contents of the uploaded file**/
    file_contents = null;
    /*Keeps Org Unit Details returned by api Call*/
    api_result = [];
    /*Stores value for data fetching status*/
    fetch_status: number = 0;
    /*Stores Match Results*/
    match_results = [];
    /*Data Count*/
    data_count: number = 0;

    constructor(private http: HttpClient) { }

    ngOnInit() {

        //Start testing
        /* var students = [
             {
                 fname: 'Victor',
                 lname: 'Mataba',
                 regno: '2015-04-02584'
             },
             {
                 fname: 'John',
                 lname: 'Kulwa',
                 regno: '2015-04-03290'
             },
             {
                 fname: 'Andrew',
                 lname: 'Emmanuel',
                 regno: '2015-04-02593'
             },
         ];
 
         var res = this.match(students,'02584','regno');
         console.log(res);*/
        //End Testing

        this.http.get(ORG_UNIT_API).subscribe((response: any) => {
            this.data_count = response.pager.total;
            // tslint:disable-next-line:no-shadowed-variable
            response.organisationUnits.forEach(element => {
                this.api_result.push(element);
            });
            const startAt = response.pager.page + 1;
            const pageCount = response.pager.pageCount;
            for (let i = startAt; i <= pageCount; i++) {
                this.http.get(ORG_UNIT_API + '?page=' + i).subscribe((response_2: any) => {
                    // tslint:disable-next-line:no-shadowed-variable
                    response_2.organisationUnits.forEach(element => {
                        this.api_result.push(element);
                    });
                });
            }


        });

    }


    /**Fired when selecting file to uplaod***/
    onFileSelected(event) {
        this.file_to_upload = event.target.files[0];
        let file_type = this.file_to_upload.name.split('.')[1];
        let reader = new FileReader();
        reader.onload = () => {
            switch (file_type) {
                case 'json':
                    /*Covert File Contents to JSON presentation*/
                    //sessionStorage.file_contents = reader.result.toString();
                    this.file_contents = reader.result.toString();
                    break;
                case 'csv':


                case 'gml':


                case 'kml':
                    alert('Sorry,system could not process a .' + file_type + ' file try .json file');
                    window.parent.location.reload();
                    break;

                default:


                /*Do nothing!*/

            }

            let file_object = JSON.parse(this.file_contents);
            /*Matching*/



            this.api_result.forEach(org_unit => {
                //console.log(org_unit.displayName);
                this.match_results.push({
                    'id': org_unit.id,
                    'name': org_unit.displayName,
                    'match_result': AppComponent.match(file_object.features, org_unit.displayName, 'properties.name')
                });
            });

            // console.log(this.match_results);

            /* this.api_result.forEach(org_unit => {
                 file_object.features.forEach(feature => {
 
                     var subject = org_unit.displayName;
                     var target = feature.properties.name;
 
                     if (subject.toLowerCase() === target.toLowerCase()) {
                         this.match_results.push(
                             {
                                 'subject': subject,
                                 'target': target,
                                 'name': subject,
                                 'geometry': feature.geometry,
                                 'le': feature.le,
                                 'type': feature.type,
                                 'percentage': '100%'
                             },
 
                         );
                     }
 
                 });
             });*/
        };

        reader.readAsText(this.file_to_upload);
    }

    /**Changes Match Option**/
    changeMatchOption(option) {
        this.match_option = option;
    }

    reload() {
        window.parent.location.reload();
    }


    //Does Matching
    static match(contents, target, key) {
        var options = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.3,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 3,
            keys: [
                key
            ]
        };
        var fuse = new Fuse(contents, options);
        return fuse.search(target).length == 0 ? null : fuse.search(target);
    }

    //For Contents Initialization Status
    getCompletionPercent(length, total) {
        var percent = ((length / total) * 100);
        if (isNaN(percent)) {
            return 0;
        } else {
            return percent.toFixed(2);
        }
    }
}
