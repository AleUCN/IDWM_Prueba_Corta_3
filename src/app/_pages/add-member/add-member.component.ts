import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/_services/member.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { CreateMember } from 'src/app/_interfaces/create-member';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: []
})
export class AddMemberComponent implements OnInit {

  forms!: FormGroup
  error: boolean = false;
  errorMessages: string[] = [];
  validMessages: string[] = [];

  constructor(private memberService: MemberService, private router: Router,private formBuilder: FormBuilder
              ,private http: HttpClient) {}


  ngOnInit(): void {
    this.createForms();
  }

  createForms() {
    this.forms = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      semester: ['',[Validators.required]],
      career: ['',[Validators.required]]
    })
  }



  async onSubmit() {
    console.log(this.forms.value);
    if (this.forms.invalid) {
      console.log(this.forms.invalid);
      this.error = true;
      this.errorMessages = ['Por Favor complete los campos como se indica.'];
      return;
    }
    try{
      const member: CreateMember = this.forms.value
      console.log("member: ",member)
      this.memberService.createMember(member).subscribe();
      console.log("Se a creado con exito")
      this.router.navigate(['/members'])
    } catch{
      this.error = true;
      this.errorMessages = ['Error en la creacion.'];
    }
  }
}
