import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateMember } from 'src/app/_interfaces/create-member';
import { MemberService } from 'src/app/_services/member.service';
import { Member } from '../../_interfaces/member';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: []
})
export class EditMemberComponent {

  forms!: FormGroup
  error: boolean = false;
  errorMessages: string[] = [];
  validMessages: string[] = [];
  member: CreateMember = history.state.data

  constructor(private memberService: MemberService, private router: Router,private formBuilder: FormBuilder
              ,private http: HttpClient) {}


  ngOnInit(): void {
    this.createForms(this.member);
  }

  createForms(member: any) {
    this.forms = this.formBuilder.group({
      name: [member.name,[Validators.required]],
      email: [member.email,[Validators.required]],
      semester: [member.semester,[Validators.required]],
      career: [member.career,[Validators.required]]
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
      //this.memberService.editMember(member).subscribe();
      console.log("Se a creado con exito")
      this.router.navigate(['/members'])
    } catch{
      this.error = true;
      this.errorMessages = ['Error en la creacion.'];
    }
  }
}
