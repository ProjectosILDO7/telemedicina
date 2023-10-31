<template>
  <div>
    <h5>
      <span class="topo-tiltle-page">
        <div class="container">Utilizadores</div>
      </span>
    </h5>
    <div class="container">
      <b-row class="mb-2" v-show="utilizadores != ''">
        <b-col>
          <label class="text-mouted"> Filtrar por:</label>
          <select class="form-select" v-model="filter">
            <option value="estudante" selected>Estudante</option>
            <option value="professor">Professores</option>
            <option value="medico">Médicos</option>
            <option value="enfermeiro">Enfermeiros</option>
            <option value="paciente">Paciente</option>
          </select>
        </b-col>
        <b-col>
          <label class="text-mouted"> Procurar por:</label>
          <b-form-input
            v-model="filter"
            type="search"
            placeholder="Pesquisar"
            class="mb-2"
          >
          </b-form-input>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-between mb-2 col-12">
        <div class="from-group" v-show="utilizadores != ''">
          <!-- <vue-excel-xlsx
            :data="utilizadores"
            :columns="columns"
            :file-name="'Lista-de-utilizadores'"
            :file-type="'xlsx'"
            :sheet-name="'cusros'"
            class="btn btn-sm btn-outline-success"
            first-text="Primeira"
          >
            <i class="fa fa-file-excel"></i> Baixar
          </vue-excel-xlsx> -->
          <export-excel
            class="btn btn-sm btn-secondary"
            :data="utilizadores"
            :name="'Lista-de-utilizadores'"
          >
            <i class="fa-solid fa-download"></i> Baixar lista
          </export-excel>
        </div>

        <div class="from-group fw-bold">
          Total de utilizadores: {{ totalutilizadores }}
        </div>

        <!-- <button
            class="btn btn-sm btn-outline-success"
            data-bs-toggle="modal"
            data-bs-target="#modal-1"
            @click="formSave"
          >
            <i class="fa-solid fa-plus"></i> utilizadores
          </button> -->
      </div>

      <!-- Modal -->
      <!-- <form>
          <div
            class="modal fade"
            id="modal-1"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title"
                    id="exampleModalLabel"
                    v-if="formEdit == false"
                  >
                    <i class="fa fa-graduation-cap"></i> Cadastrar novo utilizadore
                  </h5>
                  <h5 class="modal-title" id="exampleModalLabel" v-else>
                    <i class="fa fa-edit"></i> Alterar informações do utilizadore
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <alerte-message />
  
                  <b-row>
                    <b-col
                      md="12"
                      class="mt-2 d-flex flex-column align-items-center"
                    >
 
  
                      <input
                        ref="myFile"
                        type="file"
                        placeholder="Selecione uma imagem"
                        class="form-control d-none"
                        accept="image/*"
                        required
                        @change="heandleFile($event)"
                      />
  
                      <button
                        type="button"
                        class="btn btn-secondary"
                        @click="openFile"
                      >
                        <i class="fa-regular fa-image"></i> Adicionar imagem do
                        utilizadore
                      </button>
                      <div class="mt-2" v-if="items.url_image">
                        {{ items.url_image.name }}
                        <button
                          class="btn badge badge-light"
                          @click="
                            (items.url_image = '') && (is_alterada_image = false)
                          "
                        >
                          <i class="fa fa-trash text-danger"></i>
                        </button>
                      </div>
                    </b-col>
                    <b-col md="12" class="mt-2">
                      <input
                        type="text"
                        placeholder="Digite o nome do utilizadore"
                        class="form-control"
                        required
                        v-model="items.nome_utilizadore"
                      />
                    </b-col>
                    <b-col md="12" class="mt-2">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Duração do utilizadore"
                        required
                        v-model="items.horas_de_formacao"
                      />
                    </b-col>
                    <b-col md="12" class="mt-2">
                      <input
                        type="text"
                        placeholder="Cobrança"
                        class="form-control"
                        required
                        v-model="items.cobranca_utilizadore"
                      />
                    </b-col>
                    <b-col md="12" class="mt-2">
                      <textarea
                        type="text"
                        placeholder="Perfil de saída"
                        class="form-control"
                        rows="4"
                        required
                        v-model="items.perfil_saida"
                      ></textarea>
                    </b-col>
                  </b-row>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    data-bs-dismiss="modal"
                  >
                    <i class="fa-solid fa-xmark"></i> Fechar
                  </button>
                  <button
                    class="btn btn-primary btn-sm"
                    @click.prevent="salvar_utilizadore"
                    v-if="formEdit == false"
                  >
                    <span v-if="loading">
                      <i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...
                    </span>
                    <span v-else>
                      <i class="fa-solid fa-floppy-disk"></i> Salvar
                    </span>
                  </button>
                  <button
                    class="btn btn-primary btn-sm"
                    @click.prevent="salvar_utilizadore_alteracao(utilizadoreID)"
                    v-else
                  >
                    <span v-if="loading">
                      <i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...
                    </span>
                    <span v-else>
                      <i class="fa-solid fa-floppy-disk"></i> Salvar alteração
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form> -->
      <!-- Fim modal -->

      <b-table
        responsive
        :items="utilizadores"
        fixed
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
        caption-top
        class="text-start"
      >
        <template #table-caption>Lista de utilizadores.</template>

        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(nome)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.nome }}
          </div>
        </template>

        <template #cell(acesso)="row">
          <div class="d-flex justify-content-start">
            <span
              v-if="row.item.genero == 'F' && row.item.acesso == 'professor'"
              >Professora</span
            >
            <span
              v-else-if="
                row.item.genero == 'M' && row.item.acesso == 'professor'
              "
              >{{ row.item.acesso }}</span
            >
            <span
              v-else-if="row.item.genero == 'F' && row.item.acesso == 'medico'"
              >Médica</span
            >
            <span
              v-else-if="row.item.genero == 'M' && row.item.acesso == 'medico'"
              >Médico</span
            >
            <span
              v-else-if="
                row.item.genero == 'F' && row.item.acesso == 'enfermeiro'
              "
              >Enfermeira</span
            >
            <span v-else>{{ row.item.acesso }}</span>
          </div>
        </template>

        <template #cell(createdAt)="row">
          <div class="d-flex justify-content-start">
            {{ row.item.createdAt }}
          </div>
        </template>

        <template #cell(url_image)="row">
          <a :href="row.item.url_image" target="_blank"
            ><img :src="row.item.url_image" class="rounded-circle"
          /></a>
        </template>

        <template #cell(actions)="row">
          <div class="d-flex justify-content-start">
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-sm btn-primary"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-list"></i>
              </button>

              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-1"
                    @click="editForm(row.item.id)"
                  >
                    <i class="fa-solid fa-pen-to-square"></i> Editar
                  </button>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="confirmDilog(row.item.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i class="fa-solid fa-trash-can"></i> Apagar</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="row.toggleDetails">
                    {{ row.detailsShowing ? "-" : "+" }} Serviços</a
                  >
                </li>
              </ul>
            </div>

            <button
              type="button"
              class="btn btn-danger ml-2"
              v-if="row.item.status != 'activo'"
              title="Bloqueado"
              @click="liberarAcesso(row.item.id)"
            >
              <i class="fa-solid fa-user-lock"></i>
            </button>

            <button
              type="button"
              class="btn btn-primary ml-2"
              v-else
              title="Liberado"
              @click="bloquearAcesso(row.item.id)"
            >
              <i class="fa-solid fa-lock-open text-success"></i>
            </button>
            <div></div>
          </div>
        </template>

        <!-- Detalhes de serviços -->
        <template #row-details="row">
          <b-card class="bg-light">
            <!-- <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul> -->

            <!-- Form matricula estudante -->
            <b-row v-if="row.item.acesso == 'estudante'">
              <alert-message />

              <b-col md="12"
                ><h6>
                  <span class="text-secondary">Realizar matriculas de:</span
                  ><strong class="text-danger"> {{ row.item.nome }}</strong>
                </h6></b-col
              >
              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome">{{
                  erros.nome
                }}</label>

                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite nome completo"
                  v-model="item_estudante.nome"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome_do_pai">{{
                  erros.nome_do_pai
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Pai"
                  v-model="item_estudante.nome_do_pai"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome_da_mae">{{
                  erros.nome_da_mae
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mãe"
                  v-model="item_estudante.nome_da_mae"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.num_bilhete">{{
                  erros.num_bilhete
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nº do bilhete"
                  v-model="item_estudante.num_bilhete"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.data_de_emissao">{{
                  erros.data_de_emissao
                }}</label>
                <input
                  type="text"
                  onfocus="(this.type='date')"
                  class="form-control"
                  placeholder="Data de emissão"
                  v-model="item_estudante.data_de_emissao"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label
                  class="text-danger small"
                  v-if="erros.data_de_caducidade"
                  >{{ erros.data_de_caducidade }}</label
                >
                <input
                  type="text"
                  onfocus="(this.type='date')"
                  class="form-control"
                  placeholder="data de caducidade"
                  v-model="item_estudante.data_de_caducidade"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.provincia">{{
                  erros.provincia
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Província"
                  v-model="item_estudante.provincia"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.municipio">{{
                  erros.municipio
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Município"
                  v-model="item_estudante.municipio"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.contacto">{{
                  erros.contacto
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Contacto"
                  v-model="item_estudante.contacto"
                />
              </div>
              <b-row class="text-center text-muted mb-2 mt-2">
                <b-col>Selecione um curso e uma classe</b-col>
              </b-row>
              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <label class="text-danger small" v-if="erros.curso">{{
                  erros.curso
                }}</label>
                <select class="form-select" v-model="item_estudante.curso">
                  <option selected value="">Selecione um curso</option>
                  <option v-for="(curso, index) in cursos" :key="index">
                    {{ curso.nome_curso }}
                  </option>
                </select>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <label class="text-danger small" v-if="erros.classe">{{
                  erros.classe
                }}</label>
                <select class="form-select" v-model="item_estudante.classe">
                  <option selected value="">Selecione uma classe</option>
                  <option v-for="(c, index) in classes" :key="index">
                    {{ c.nome_classe }}
                  </option>
                </select>
              </div>
              <!-- upload de documento -->
              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <input
                  type="file"
                  ref="fileDoc1"
                  accept="application/pdf"
                  class="form-control d-none"
                  @change="hendleFileDocPessaol($event)"
                  required
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <input
                  type="file"
                  ref="fileDoc2"
                  accept="application/pdf"
                  class="form-control d-none"
                  @change="hendleFileDocCerticate($event)"
                  required
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 d-flex flex-column align-item-center"
              >
                <b-button @click="openFileDilogDocPessoa"
                  ><i class="fa-regular fa-id-card"></i> Carregar
                  Bilhete</b-button
                >
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 d-flex flex-column align-item-center"
              >
                <b-button @click="openFileDilogCertificate"
                  ><i class="fa-solid fa-certificate"></i> Carregar
                  certificado</b-button
                >
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-cente"
                v-if="erros.url_file_bilhete"
              >
                <label class="text-danger small">{{
                  erros.url_file_bilhete
                }}</label>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="erros.url_file_certificado"
              >
                <label class="text-danger small">{{
                  erros.url_file_certificado
                }}</label>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="item_estudante.url_file_bilhete"
              >
                <span>{{ item_estudante.url_file_bilhete.name }}</span>
                <button
                  class="btn badge badge-light"
                  @click="item_estudante.url_file_bilhete = ''"
                >
                  <i class="fa fa-trash text-danger"></i>
                </button>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="item_estudante.url_file_certificado"
              >
                <span>{{ item_estudante.url_file_certificado.name }}</span>
                <button
                  class="btn badge badge-light"
                  @click="item_estudante.url_file_certificado = ''"
                >
                  <i class="fa fa-trash text-danger"></i>
                </button>
              </div>

              <!-- fim de upload de documento -->
              <div
                class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2 d-flex flex-column align-item-end mt-2"
              >
                <button
                  class="btn btn-primary"
                  @click="salvar_estudante(row.item.id, row.item.url_image)"
                  :disabled="loading"
                >
                  <span v-if="loading"
                    ><i class="fa-solid fa-circle-notch fa-spin"></i>
                    Cadastrando ...</span
                  >
                  <span v-else
                    ><i class="fa fa-graduation-cap"></i> Inscrever o(a)
                    estudante</span
                  >
                </button>
              </div>
            </b-row>

            <!-- Fim from matricula estudante -->

            <!-- Form registo de professor, medicos e enfermeiros -->
            <b-row
              v-else-if="
                row.item.acesso == 'outra' ||
                row.item.acesso == 'professor' ||
                row.item.acesso == 'medico' ||
                row.item.acesso == 'enfermeiro'
              "
            >
              <alert-message />

              <b-col md="12"
                ><h6>
                  <span class="text-secondary">Mais informações sobre:</span
                  ><strong class="text-danger"> {{ row.item.nome }}</strong>
                </h6></b-col
              >
              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome">{{
                  erros.nome
                }}</label>

                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite nome completo"
                  v-model="item_funcionario.nome"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome_do_pai">{{
                  erros.nome_do_pai
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Pai"
                  v-model="item_funcionario.nome_do_pai"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome_da_mae">{{
                  erros.nome_da_mae
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mãe"
                  v-model="item_funcionario.nome_da_mae"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.num_bilhete">{{
                  erros.num_bilhete
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nº do bilhete"
                  v-model="item_funcionario.num_bilhete"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.data_de_emissao">{{
                  erros.data_de_emissao
                }}</label>
                <input
                  type="text"
                  onfocus="(this.type='date')"
                  class="form-control"
                  placeholder="Data de emissão"
                  v-model="item_funcionario.data_de_emissao"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label
                  class="text-danger small"
                  v-if="erros.data_de_caducidade"
                  >{{ erros.data_de_caducidade }}</label
                >
                <input
                  type="text"
                  onfocus="(this.type='date')"
                  class="form-control"
                  placeholder="data de caducidade"
                  v-model="item_funcionario.data_de_caducidade"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.provincia">{{
                  erros.provincia
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Província"
                  v-model="item_funcionario.provincia"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.municipio">{{
                  erros.municipio
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Município"
                  v-model="item_funcionario.municipio"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.contacto">{{
                  erros.contacto
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Contacto"
                  v-model="item_funcionario.contacto"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label
                  class="text-danger small"
                  v-if="erros.area_de_formacao"
                  >{{ erros.area_de_formacao }}</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Área de formação"
                  v-model="item_funcionario.area_de_formacao"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label
                  class="text-danger small"
                  v-if="erros.area_de_especializacao"
                  >{{ erros.area_de_especializacao }}</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Área de especialização"
                  v-model="item_funcionario.area_de_especializacao"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label
                  class="text-danger small"
                  v-if="erros.instituto_de_formacao"
                  >{{ erros.instituto_de_formacao }}</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Instituto onde se formou"
                  v-model="item_funcionario.instituto_de_formacao"
                />
              </div>

              <b-row class="text-center text-muted mb-2 mt-2">
                <b-col>Uma breve descrição do funcionário</b-col>
              </b-row>
              <div
                class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2"
              >
                <label class="text-danger small" v-if="erros.breve_descricao">{{
                  erros.breve_descricao
                }}</label>
                <template>
                  <div>
                    <b-form-textarea
                      id="textarea"
                      v-model="item_funcionario.breve_descricao"
                      placeholder="Escreva alguma coisa..."
                      rows="3"
                      max-rows="6"
                    ></b-form-textarea>
                  </div>
                </template>
              </div>

              <!-- upload de documento -->
              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <input
                  type="file"
                  ref="fileDoc1"
                  accept="application/pdf"
                  class="form-control d-none"
                  @change="hendleFileDocPessaolFuncionario($event)"
                  required
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"
              >
                <input
                  type="file"
                  ref="fileDoc2"
                  accept="application/pdf"
                  class="form-control d-none"
                  @change="hendleFileDocPessaolCertificadoFuncionario($event)"
                  required
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 d-flex flex-column align-item-center"
              >
                <b-button @click="openFileDilogDocFuncionario"
                  ><i class="fa-regular fa-id-card"></i> Carregar
                  Bilhete</b-button
                >
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 d-flex flex-column align-item-center"
              >
                <b-button @click="openFileDilogCertificateFuncionario"
                  ><i class="fa-solid fa-certificate"></i> Carregar
                  certificado</b-button
                >
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-cente"
                v-if="erros.url_file_bilhete"
              >
                <label class="text-danger small">{{
                  erros.url_file_bilhete
                }}</label>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="erros.url_file_certificado"
              >
                <label class="text-danger small">{{
                  erros.url_file_certificado
                }}</label>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="item_funcionario.url_file_bilhete"
              >
                <span>{{ item_funcionario.url_file_bilhete.name }}</span>
                <button
                  class="btn badge badge-light"
                  @click="item_funcionario.url_file_bilhete = ''"
                >
                  <i class="fa fa-trash text-danger"></i>
                </button>
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-center"
                v-if="item_funcionario.url_file_certificado"
              >
                <span>{{ item_funcionario.url_file_certificado.name }}</span>
                <button
                  class="btn badge badge-light"
                  @click="item_funcionario.url_file_certificado = ''"
                >
                  <i class="fa fa-trash text-danger"></i>
                </button>
              </div>

              <!-- fim de upload de documento -->
              <div
                class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2 d-flex flex-column align-item-end mt-2"
              >
                <button
                  class="btn btn-primary"
                  @click="salvar_funcionario(row.item.id, row.item.url_image)"
                  :disabled="loading"
                  v-if="row.item.acesso != 'outra'"
                >
                  <span v-if="loading"
                    ><i class="fa-solid fa-circle-notch fa-spin"></i>
                    Cadastrando ...</span
                  >
                  <span v-else
                    ><i class="fa fa-graduation-cap"></i> Registar o(a)
                    funcionário(a)</span
                  >
                </button>
                <button class="btn btn-danger" disabled v-else>
                  <i class="fa-solid fa-user-lock"></i> Precisas alterar a área
                  de acesso
                </button>
              </div>
            </b-row>
            <!-- Fim form de professor, medico, e enfermeiro -->

            <!-- Form registo de paciente -->
            <b-row v-else>
              <alert-message />

              <b-col md="12"
                ><h6>
                  <span class="text-secondary">Mais informações sobre:</span
                  ><strong class="text-danger"> {{ row.item.nome }}</strong>
                </h6></b-col
              >
              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome">{{
                  erros.nome
                }}</label>

                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite nome completo"
                  v-model="item_paciente.nome"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome_do_pai">{{
                  erros.nome_do_pai
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Pai"
                  v-model="item_paciente.nome_do_pai"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.nome_da_mae">{{
                  erros.nome_da_mae
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Mãe"
                  v-model="item_paciente.nome_da_mae"
                />
              </div>
              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.num_bilhete">{{
                  erros.num_bilhete
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nº do documento pessaol"
                  v-model="item_paciente.num_bilhete"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.provincia">{{
                  erros.provincia
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Província"
                  v-model="item_paciente.provincia"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.municipio">{{
                  erros.municipio
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Município"
                  v-model="item_paciente.municipio"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.morada">{{
                  erros.morada
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Morada"
                  v-model="item_paciente.morada"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
              >
                <label class="text-danger small" v-if="erros.contacto">{{
                  erros.contacto
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Contacto"
                  v-model="item_paciente.contacto"
                />
              </div>

              <div
                class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2 d-flex flex-column align-item-end mt-2"
              >
                <button
                  class="btn btn-primary"
                  @click="salvar_paciente(row.item.id, row.item.url_image)"
                  :disabled="loading"
                >
                  <span v-if="loading"
                    ><i class="fa-solid fa-circle-notch fa-spin"></i>
                    Cadastrando ...</span
                  >
                  <span v-else
                    ><i class="fa fa-graduation-cap"></i> Registar o(a)
                    paciente</span
                  >
                </button>
              </div>
            </b-row>
          </b-card>
        </template>
        <!-- Fim de detalhes de serviços -->
      </b-table>

      <!-- Detalhes -->
      <!-- <div
          class="offcanvas offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
              Mais detalhes do utilizadore
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <alerte-message />
            <p class="text-danger">
              <strong>{{ items.nome_utilizadore }}</strong>
            </p>
            <hr class="text-success" />
            <img :src="items.url_image" style="width: 100%; height: 50%" />
  
            <p class="text-secondary">
              <strong>{{ items.perfil_saida }}</strong>
            </p>
  
            <p class="text-secondary">
              Duração: <strong>{{ items.horas_de_formacao }}</strong>
            </p>
            <br />
            <p class="small text-muted text-center">Última actualização</p>
            <p class="text-center">
              <strong>{{ items.data_criacao }}</strong>
            </p>
          </div>
        </div> -->

      <!-- Modal Apagar -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="exampleModalLabel">
                <i class="fa fa-trash text-danger"></i> Apagar o utilizadore
              </h6>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <alert-message />
              <span class="text-danger"
                ><strong
                  >Tens a certeza que pretendes apagar este utilizadore ?
                </strong></span
              >
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <i class="fa-solid fa-xmark"></i> Fechar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="apagar(idDelete)"
                :disabled="loading"
              >
                <span v-if="loading">
                  <i class="fa-solid fa-circle-notch fa-spin"></i> Apagar
                  ...</span
                >
                <span v-else>
                  <i class="fa-solid fa-trash-can"></i> Sim apagar</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Show modal form edit -->
      <form>
        <div
          class="modal fade"
          id="modal-1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="exampleModalLabel">
                  <i class="fa fa-edit"></i> Alterar informações de utilizador
                </h6>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <alert-message />

                <b-row class="text-center">
                  <b-col class="flex-column d-flex align-item-center">
                    <input
                      ref="myFile"
                      type="file"
                      placeholder="Selecione uma imagem de perfil"
                      class="form-control d-none"
                      accept="image/*"
                      required
                      @change="heandleFile($event)"
                    />

                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="openFile"
                    >
                      <i class="fa-regular fa-image"></i> ( Opcional ) Carregue
                      uma foto de perfil
                    </button>
                    <div class="mt-2" v-if="item_utilizador.url_image">
                      {{ item_utilizador.url_image.name }}
                      <button
                        class="btn badge badge-light"
                        @click="item_utilizador.url_image = ''"
                      >
                        <i class="fa fa-trash text-danger"></i>
                      </button>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="mt-2">
                    <label class="text-danger small" v-if="erros.nome">{{
                      erros.nome
                    }}</label>
                    <b-form-input
                      v-model="item_utilizador.nome"
                      placeholder="Nome completo"
                    ></b-form-input>
                  </b-col>
                </b-row>

                <b-row class="mt-2">
                  <b-col>
                    <label class="text-danger small" v-if="erros.acesso">{{
                      erros.acesso
                    }}</label>
                    <select
                      class="form-control"
                      v-model="item_utilizador.acesso"
                      v-if="
                        selectOption == 'outra' ||
                        selectOption == 'professor' ||
                        selectOption == 'medico' ||
                        selectOption == 'enfermeiro'
                      "
                    >
                      <option value="" selected>Mudar área de acesso:</option>
                      <option value="professor">
                        <i class="fa-solid fa-wheelchair"></i> Professor
                      </option>
                      <option value="medico">
                        <i class="fa-solid fa-wheelchair"></i> Médico
                      </option>
                      <option value="enfermeiro">
                        <i class="fa-solid fa-wheelchair"></i> Enfermeiro
                      </option>
                    </select>
                    <select
                      class="form-control"
                      v-model="item_utilizador.acesso"
                      v-else
                    >
                      <option value="" selected>Mudar área de acesso:</option>
                      <option value="estudante">
                        <i class="fa-solid fa-wheelchair"></i> Estudante
                      </option>
                      <option value="paciente">
                        <i class="fa-solid fa-wheelchair"></i> Paciente
                      </option>
                    </select>
                  </b-col>
                  <b-col>
                    <select
                      class="form-control"
                      v-model="item_utilizador.genero"
                    >
                      <option value="" selected>Gênero:</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </select>
                  </b-col>
                </b-row>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  <i class="fa-solid fa-xmark"></i> Fechar
                </button>

                <button
                  class="btn btn-primary btn-sm"
                  @click.prevent="salvar_utilizador_alteracao(editFormID)"
                  :disabled="loading"
                >
                  <span v-if="loading">
                    <i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...
                  </span>
                  <span v-else>
                    <i class="fa-solid fa-floppy-disk"></i> Salvar alteração
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <!-- Fim modal -->

      <div class="overflow-auto">
        <div class="mt-0">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalutilizadores"
            :per-page="perPage"
            align="right"
            size="sm"
            class="my-0"
            first-text="Primeira"
            prev-text="Anterior"
            next-text="Próxima"
            last-text="Última"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import alertMessage from "../../../components/alertas/alertComponent.vue";
import { getStorage, ref, deleteObject } from "firebase/storage";
//import vueExcelXlsx from "@vue-excel-xlsx";

export default {
  name: "utilizadores-pages",
  components: { alertMessage },
  data() {
    return {
      selectOption: "",
      utilizadores: [],
      editFormID: "",
      text: "",
      erros: [],
      cursos: [],
      classes: [],
      idDelete: "",
      loading: false,
      utilizadoreID: "",
      totalRows: "",
      formEdit: false,
      url_windows: window.URL,
      columns: [
        {
          label: "Nome do utilizadore",
          field: "nome",
          //dataFormat: this.priceFormat
        },
        {
          label: "Acesso",
          field: "acesso",
        },
        {
          label: "Data de criação",
          field: "createdAt",
          dataFormat: this.formatoDeData,
        },
      ],
      path_edit_img: "",
      is_alterada_image: false,
      oldImage: "",

      item_utilizador: {
        nome: "",
        url_image: "",
        image_name: "",
        acesso: "",
        data_de_criacao: "",
      },
      path_edit_url_file_bilhete: "",
      path_edit_url_file_certificado: "",
      path_edit_url_image: "",
      item_estudante: {
        nome: "",
        nome_do_pai: "",
        nome_da_mae: "",
        num_bilhete: "",
        data_de_emissao: "",
        data_de_caducidade: "",
        provincia: "",
        municipio: "",
        contacto: "",
        curso: "",
        classe: "",
        file_name_bilhete: "",
        url_file_bilhete: "",
        file_name_certificado: "",
        url_file_certificado: "",
      },

      item_funcionario: {
        nome: "",
        nome_do_pai: "",
        nome_da_mae: "",
        num_bilhete: "",
        data_de_emissao: "",
        data_de_caducidade: "",
        provincia: "",
        municipio: "",
        contacto: "",
        area_de_formacao: "",
        area_de_especializacao: "",
        instituto_de_formacao: "",
        breve_descricao: "",
        file_name_bilhete: "",
        url_file_bilhete: "",
        file_name_certificado: "",
        url_file_certificado: "",
      },

      item_paciente: {
        nome: "",
        nome_do_pai: "",
        nome_da_mae: "",
        num_bilhete: "",
        provincia: "",
        municipio: "",
        morada: "",
        contacto: "",
      },

      fields: [
        {
          key: "url_image",
          label: "Imagem do utilizadore",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nome",
          label: "Nome do utilizadore",
          sortable: true,
        },
        {
          key: "acesso",
          label: "Função/Acesso",
          sortable: true,
        },
        {
          key: "createdAt",
          label: "Data de criação",
          sortable: true,
        },

        { key: "actions", label: "Acções" },
      ],
      currentPage: 1,
      perPage: 3,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },

  watch: {
    path_edit_img(newValue) {
      if (newValue) {
        this.is_alterada_image = true;
        this.oldImage = newValue;
        console.log(this.oldImage);
      } else {
        console.log((this.is_alterada_image = false));
      }
    },
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },

    fileName() {
      const { url_image } = this.item_utilizador;
      if (url_image) {
        const split = url_image.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },

    fileNameBilhete() {
      const { url_file_bilhete } = this.item_estudante;
      if (url_file_bilhete) {
        const split = url_file_bilhete.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },
    fileNameBilheteFuncionario() {
      const { url_file_bilhete } = this.item_funcionario;
      if (url_file_bilhete) {
        const split = url_file_bilhete.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },
    fileNameCertificado() {
      const { url_file_certificado } = this.item_estudante;
      if (url_file_certificado) {
        const split = url_file_certificado.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },
    fileNameCertificadoFuncionario() {
      const { url_file_certificado } = this.item_funcionario;
      if (url_file_certificado) {
        const split = url_file_certificado.name.split(".");
        return `${split[0]}-${new Date().getTime()}.${split[1]}`;
      } else {
        return "";
      }
    },

    totalutilizadores() {
      return this.utilizadores.length;
    },
  },

  mounted() {
    // Set the initial number of item_utilizador
    this.totalRows = this.utilizadores.length;
  },

  created() {
    this.carregarutilizadores();
    this.carregarCursos();
    this.carregarClasses();
  },

  methods: {
    cleanFormEstudante() {
      this.item_estudante = {
        nome: "",
        nome_do_pai: "",
        nome_da_mae: "",
        num_bilhete: "",
        data_de_emissao: "",
        data_de_caducidade: "",
        provincia: "",
        municipio: "",
        contacto: "",
        curso: "",
        file_name_bilhete: "",
        url_file_bilhete: "",
        file_name_certificado: "",
        url_file_certificado: "",
      };
    },

    cleanFormUtilizador() {
      this.item_utilizador = {
        nome: "",
        url_image: "",
        image_name: "",
        acesso: "",
        data_de_criacao: "",
      };
    },
    cleanFormPaciente() {
      this.item_paciente = {
        nome: "",
        nome_do_pai: "",
        nome_da_mae: "",
        num_bilhete: "",
        provincia: "",
        municipio: "",
        morada: "",
        contacto: "",
      };
    },
    cleanFormFuncionario() {
      this.item_funcionario = {
        nome: "",
        nome_do_pai: "",
        nome_da_mae: "",
        num_bilhete: "",
        data_de_emissao: "",
        data_de_caducidade: "",
        provincia: "",
        municipio: "",
        contacto: "",
        area_de_formacao: "",
        area_de_especializacao: "",
        instituto_de_formacao: "",
        breve_descricao: "",
        file_name_bilhete: "",
        url_file_bilhete: "",
        file_name_certificado: "",
        url_file_certificado: "",
      };
    },

    // validar campos de utilizador
    validarCamposPaciente() {
      if (this.item_paciente.nome == "") {
        this.erros.push({
          nome: "Informe o nome do(a) paciente",
        });
        this.erros.nome = "Informe o nome do(a) paciente";
      } else {
        this.erros.nome = "";
      }

      if (this.item_paciente.nome_do_pai == "") {
        this.erros.push({
          nome_do_pai: "Informe o nome do pai do(a) paciente",
        });
        this.erros.nome_do_pai = "Informe o nome do pai do(a) paciente";
      } else {
        this.erros.nome_do_pai = "";
      }

      if (this.item_paciente.nome_da_mae == "") {
        this.erros.push({
          nome_da_mae: "Informe o nome da mãe do(a) paciente",
        });
        this.erros.nome_da_mae = "Informe o nome da mãe do(a) paciente";
      } else {
        this.erros.nome_da_mae = "";
      }

      if (this.item_paciente.num_bilhete == "") {
        this.erros.push({
          num_bilhete: "Informe o nº do documento do(a) paciente",
        });
        this.erros.num_bilhete = "Informe o nº do documento do(a) paciente";
      } else {
        this.erros.num_bilhete = "";
      }

      if (this.item_paciente.provincia == "") {
        this.erros.push({
          provincia: "Informe a província onde reside o(a) paciente",
        });
        this.erros.provincia = "Informe a província onde reside o(a) paciente";
      } else {
        this.erros.provincia = "";
      }

      if (this.item_paciente.municipio == "") {
        this.erros.push({
          municipio: "Informe o município onde reside o(a) paciente",
        });
        this.erros.municipio = "Informe o município onde reside o(a) paciente";
      } else {
        this.erros.municipio = "";
      }

      if (this.item_paciente.morada == "") {
        this.erros.push({
          morada: "Informe a morada onde reside o(a) paciente",
        });
        this.erros.morada = "Informe a morada onde reside o(a) paciente";
      } else {
        this.erros.morada = "";
      }

      if (this.item_paciente.contacto == "") {
        this.erros.push({
          contacto: "Informe a contacto do(a) paciente",
        });
        this.erros.contacto = "Informe a contacto do(a) paciente";
      } else {
        this.erros.contacto = "";
      }
    },
    validarFormUtilizador() {
      if (this.item_utilizador.nome == "") {
        this.erros.push({
          nome: "Informe o nome do(a) utilizador",
        });
        this.erros.nome = "Informe o nome do(a) utilizador";
      } else {
        this.erros.nome = "";
      }

      if (this.item_utilizador.url_image == "") {
        this.erros.push({
          url_image: "Carregue uma imagem do(a) utilizador",
        });
        this.erros.url_image = "Carregue uma imagem do(a) utilizador";
      } else {
        this.erros.url_image = "";
      }

      if (this.item_utilizador.acesso == "") {
        this.erros.push({
          acesso: "Selecione uma área de acesso do(a) utilizador",
        });
        this.erros.acesso = "Selecione uma área de acesso do(a) utilizador";
      } else {
        this.erros.acesso = "";
      }
    },
    // fim validar campo de utilizador

    // validar campos de estudante
    validarCampos() {
      if (this.item_estudante.nome == "") {
        this.erros.push({
          nome: "Informe o nome do(a) estudante",
        });
        this.erros.nome = "Informe o nome do(a) estudante";
      } else {
        this.erros.nome = "";
      }

      if (this.item_estudante.nome_do_pai == "") {
        this.erros.push({
          nome_do_pai: "Informe o nome do pai do(a) estudante",
        });
        this.erros.nome_do_pai = "Informe o nome do pai do(a) estudante";
      } else {
        this.erros.nome_do_pai = "";
      }

      if (this.item_estudante.nome_da_mae == "") {
        this.erros.push({
          nome_da_mae: "Informe o nome da mãe do(a) estudante",
        });
        this.erros.nome_da_mae = "Informe o nome da mãe do(a) estudante";
      } else {
        this.erros.nome_da_mae = "";
      }

      if (this.item_estudante.num_bilhete == "") {
        this.erros.push({
          num_bilhete: "Informe o nº do documento pessoal",
        });
        this.erros.num_bilhete = "Informe o nº do documento pessoal";
      } else if (this.item_estudante.num_bilhete.length != 14) {
        this.erros.push({
          num_bilhete:
            "O nº do documento pessoal deve conter no máximo 14 caracteres",
        });
        this.erros.num_bilhete =
          "O nº do documento pessoal deve conter no máximo 14 caracteres";
      } else {
        this.erros.num_bilhete = "";
      }

      if (this.item_estudante.data_de_emissao == "") {
        this.erros.push({
          data_de_emissao: "Informe a data de emissão do documento pessoal",
        });
        this.erros.data_de_emissao =
          "Informe a data de emissão do documento pessoal";
      } else {
        this.erros.data_de_emissao = "";
      }

      if (this.item_estudante.data_de_caducidade == "") {
        this.erros.push({
          data_de_caducidade:
            "Informe a data de caducidade do documento pessoal",
        });
        this.erros.data_de_caducidade =
          "Informe a data de caducidade do documento pessoal";
      } else {
        this.erros.data_de_caducidade = "";
      }

      if (this.item_estudante.provincia == "") {
        this.erros.push({
          provincia: "Informe nome da Província",
        });
        this.erros.provincia = "Informe nome da Província";
      } else {
        this.erros.provincia = "";
      }

      if (this.item_estudante.municipio == "") {
        this.erros.push({
          municipio: "Informe o nome do  Município",
        });
        this.erros.municipio = "Informe o nome do  Município";
      } else {
        this.erros.municipio = "";
      }

      if (this.item_estudante.contacto == "") {
        this.erros.push({
          contacto: "Informe o terminal de contacto",
        });
        this.erros.contacto = "Informe o terminal de contacto";
      } else if (this.item_estudante.contacto.length != 9) {
        this.erros.push({
          contacto: "O nº do terminal deve conter no máximo 9 dígitos",
        });
        this.erros.contacto =
          "O nº do terminal deve conter no máximo 9 dígitos";
      } else {
        this.erros.contacto = "";
      }

      if (this.item_estudante.curso == "") {
        this.erros.push({
          curso: "Selecione um curso",
        });
        this.erros.curso = "Selecione um curso";
      } else {
        this.erros.curso = "";
      }

      if (this.item_estudante.url_file_bilhete == "") {
        this.erros.push({
          url_file_bilhete: "É obrigatório carregar um documento pessoal",
        });
        this.erros.url_file_bilhete =
          "É obrigatório carregar um documento pessoal";
      } else {
        this.erros.url_file_bilhete = "";
      }

      if (this.item_estudante.url_file_certificado == "") {
        this.erros.push({
          url_file_certificado:
            "É obrigatório carregar um certificado da formação anterior",
        });
        this.erros.url_file_certificado =
          "É obrigatório carregar um certificado da formação anterior";
      } else {
        this.erros.url_file_certificado = "";
      }
    },
    // fim validar campo de estudante

    // validar campos de funcionario
    validarCamposFuncionario() {
      if (this.item_funcionario.nome == "") {
        this.erros.push({
          nome: "Informe o nome do(a) funcionario",
        });
        this.erros.nome = "Informe o nome do(a) funcionario";
      } else {
        this.erros.nome = "";
      }

      if (this.item_funcionario.nome_do_pai == "") {
        this.erros.push({
          nome_do_pai: "Informe o nome do pai do(a) funcionario",
        });
        this.erros.nome_do_pai = "Informe o nome do pai do(a) funcionario";
      } else {
        this.erros.nome_do_pai = "";
      }

      if (this.item_funcionario.nome_da_mae == "") {
        this.erros.push({
          nome_da_mae: "Informe o nome da mãe do(a) funcionario",
        });
        this.erros.nome_da_mae = "Informe o nome da mãe do(a) funcionario";
      } else {
        this.erros.nome_da_mae = "";
      }

      if (this.item_funcionario.num_bilhete == "") {
        this.erros.push({
          num_bilhete: "Informe o nº do documento pessoal",
        });
        this.erros.num_bilhete = "Informe o nº do documento pessoal";
      } else if (this.item_funcionario.num_bilhete.length != 14) {
        this.erros.push({
          num_bilhete:
            "O nº do documento pessoal deve conter no máximo 14 caracteres",
        });
        this.erros.num_bilhete =
          "O nº do documento pessoal deve conter no máximo 14 caracteres";
      } else {
        this.erros.num_bilhete = "";
      }

      if (this.item_funcionario.data_de_emissao == "") {
        this.erros.push({
          data_de_emissao: "Informe a data de emissão do documento pessoal",
        });
        this.erros.data_de_emissao =
          "Informe a data de emissão do documento pessoal";
      } else {
        this.erros.data_de_emissao = "";
      }

      if (this.item_funcionario.data_de_caducidade == "") {
        this.erros.push({
          data_de_caducidade:
            "Informe a data de caducidade do documento pessoal",
        });
        this.erros.data_de_caducidade =
          "Informe a data de caducidade do documento pessoal";
      } else {
        this.erros.data_de_caducidade = "";
      }

      if (this.item_funcionario.provincia == "") {
        this.erros.push({
          provincia: "Informe nome da Província",
        });
        this.erros.provincia = "Informe nome da Província";
      } else {
        this.erros.provincia = "";
      }

      if (this.item_funcionario.municipio == "") {
        this.erros.push({
          municipio: "Informe o nome do  Município",
        });
        this.erros.municipio = "Informe o nome do  Município";
      } else {
        this.erros.municipio = "";
      }

      if (this.item_funcionario.contacto == "") {
        this.erros.push({
          contacto: "Informe o terminal de contacto",
        });
        this.erros.contacto = "Informe o terminal de contacto";
      } else if (this.item_funcionario.contacto.length != 9) {
        this.erros.push({
          contacto: "O nº do terminal deve conter no máximo 9 dígitos",
        });
        this.erros.contacto =
          "O nº do terminal deve conter no máximo 9 dígitos";
      } else {
        this.erros.contacto = "";
      }

      if (this.item_funcionario.breve_descricao == "") {
        this.erros.push({
          breve_descricao: "Selecione um breve descrição",
        });
        this.erros.breve_descricao = "Selecione um breve descrição";
      } else {
        this.erros.breve_descricao = "";
      }

      if (this.item_funcionario.area_de_formacao == "") {
        this.erros.push({
          area_de_formacao: "Informe uma área de formação",
        });
        this.erros.area_de_formacao = "Informe uma área de formação";
      } else {
        this.erros.area_de_formacao = "";
      }

      if (this.item_funcionario.area_de_especializacao == "") {
        this.erros.push({
          area_de_especializacao: "Informe uma área de especialização",
        });
        this.erros.area_de_especializacao =
          "Informe uma área de especialização";
      } else {
        this.erros.area_de_especializacao = "";
      }

      if (this.item_funcionario.instituto_de_formacao == "") {
        this.erros.push({
          instituto_de_formacao: "Informe uma área de formação",
        });
        this.erros.instituto_de_formacao = "Informe uma área de formação";
      } else {
        this.erros.instituto_de_formacao = "";
      }

      if (this.item_funcionario.url_file_bilhete == "") {
        this.erros.push({
          url_file_bilhete: "É obrigatório carregar um documento pessoal",
        });
        this.erros.url_file_bilhete =
          "É obrigatório carregar um documento pessoal";
      } else {
        this.erros.url_file_bilhete = "";
      }

      if (this.item_funcionario.url_file_certificado == "") {
        this.erros.push({
          url_file_certificado:
            "É obrigatório carregar um certificado da formação anterior",
        });
        this.erros.url_file_certificado =
          "É obrigatório carregar um certificado da formação anterior";
      } else {
        this.erros.url_file_certificado = "";
      }
    },
    // fim validar campo de funcionario

    async carregarCursos() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("cursos")
        .where("idUser", "==", window.uid)
        .get()
        .then((snapshot) => {
          (this.cursos = []),
            snapshot.forEach((doc) => {
              this.cursos.push({
                id: doc.id,
                url_image: doc.data().url_image,
                nome_curso: doc.data().nome_curso,
                cobranca_curso: doc.data().cobranca_curso,
                data_criacao: moment(doc.data().data_criacao).format(
                  "DD-MM-YYYY"
                ),
              });
            });
        });
      this.$root.$emit("loading::hide");
    },
    async carregarClasses() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("Classes")
        .where("idUser", "==", window.uid)
        .get()
        .then((snapshot) => {
          (this.classes = []),
            snapshot.forEach((doc) => {
              this.classes.push({
                id: doc.id,
                nome_classe: doc.data().nome_classe,
              });
            });
        });
      this.$root.$emit("loading::hide");
    },
    openFileDilogDocPessoa() {
      this.$refs.fileDoc1.value = "";
      this.$refs.fileDoc1.click();
    },

    openFileDilogCertificate() {
      this.$refs.fileDoc2.value = "";
      this.$refs.fileDoc2.click();
    },
    openFileDilogDocFuncionario() {
      this.$refs.fileDoc1.value = "";
      this.$refs.fileDoc1.click();
    },

    openFileDilogCertificateFuncionario() {
      this.$refs.fileDoc2.value = "";
      this.$refs.fileDoc2.click();
    },

    heandleFile({ target }) {
      this.item_utilizador.url_image = target.files[0];
      this.path_edit_img = this.item_utilizador.image_name;
    },

    hendleFileDocPessaol({ target }) {
      this.item_estudante.url_file_bilhete = target.files[0];
      this.path_edit_url_file_bilhete = this.item_estudante.file_name_bilhete;
    },
    hendleFileDocCerticate({ target }) {
      this.item_estudante.url_file_certificado = target.files[0];
      this.path_edit_url_file_certificado =
        this.item_estudante.file_name_certificado;
    },

    hendleFileDocPessaolFuncionario({ target }) {
      this.item_funcionario.url_file_bilhete = target.files[0];
      this.path_edit_url_file_bilhete = this.item_funcionario.file_name_bilhete;
    },
    hendleFileDocPessaolCertificadoFuncionario({ target }) {
      this.item_funcionario.url_file_certificado = target.files[0];
      this.path_edit_url_file_certificado =
        this.item_funcionario.file_name_certificado;
    },
    async carregarutilizadores() {
      this.$root.$emit("loading::show");
      await this.$firebase
        .firestore()
        .collection("users")
        .where("acesso", "!=", "SuperAdmin-dev")
        .get()
        .then((snapshot) => {
          (this.utilizadores = []),
            snapshot.forEach((doc) => {
              this.utilizadores.push({
                id: doc.id,
                url_image: doc.data().url_image,
                nome: doc.data().nome,
                acesso: doc.data().acesso,
                genero: doc.data().genero,
                status: doc.data().status,
                createdAt: moment(doc.data().createdAt).format("DD-MM-YYYY"),
              });
            });
        });
      this.$root.$emit("loading::hide");
    },

    confirmDilog(id) {
      this.idDelete = id;
    },

    async editForm(id) {
      this.editFormID = id;
      this.cleanFormUtilizador();
      try {
        this.$root.$emit("loading::show");
        const valorCurso = await this.$firebase
          .firestore()
          .collection("users")
          .doc(id)
          .get();
        this.item_utilizador = valorCurso.data();
        this.selectOption = valorCurso.data().acesso;
      } catch (error) {
        this.$root.$emit("showAlert::show", {
          type: "danger",
          message:
            "Houve um erro ao carregar as informações do curso, verifica sua conexão com a internet",
          titulo: "Erro",
        });
      } finally {
        this.$root.$emit("loading::hide");
      }
    },

    async salvar_utilizador_alteracao(id) {
      this.loading = true;
      this.erros = [];
      this.validarFormUtilizador();
      if (this.erros.length > 0) {
        this.validarFormUtilizador();
      } else {
        try {
          if (this.is_alterada_image == false) {
            const { nome } = this.item_utilizador;
            await this.$firebase
              .firestore()
              .collection("users")
              .doc(id)
              .update({
                nome,
                data_criacao: new Date().getTime(),
                //url_image: url,
              });

            await this.$firebase
              .firestore()
              .collection("users")
              .doc(id)
              .update({
                ...this.item_utilizador,
                data_criacao: new Date().getTime(),
                // url_image: url,
              })
              .then(() => {
                this.$root.$emit("showAlert::show", {
                  type: "success",
                  message: "Actualização realizada com sucesso",
                  titulo: "Sucesso",
                });
                this.cleanFormUtilizador();
                this.carregarutilizadores();
              });
          } else {
            let url = "";
            let envio_de_imagem = "";
            await this.$firebase
              .storage()
              .ref("imagens/perfil/" + this.oldImage)
              .getDownloadURL()
              .then(() => {
                envio_de_imagem = "apagar_img_inserir_depois";
                //caso exista apaga a antiga imagem e inser um novo lick
              })
              .catch((erro) => {
                envio_de_imagem = erro.code;
              });

            switch (envio_de_imagem) {
              case "storage/object-not-found":
                // Inserir nova imagem no Storage
                var snapshot = await this.$firebase
                  .storage()
                  .ref("imagens/perfil/")
                  .child(this.fileName)
                  .put(this.item_utilizador.url_image);
                this.item_utilizador.image_name = this.fileName;
                url = await snapshot.ref.getDownloadURL();
                break;

              case "apagar_img_inserir_depois":
                //Apagar primeiro
                var storage = getStorage();
                var delRef = ref(storage, "imagens/perfil/" + this.oldImage);
                await deleteObject(delRef).then(() => {
                  console.log("Imagem atiga apagada com sucesso");
                });
                //inserir nova imagem depois
                var novaReferencia = await this.$firebase
                  .storage()
                  .ref("imagens/perfil/")
                  .child(this.fileName)
                  .put(this.item_utilizador.url_image);
                this.item_utilizador.image_name = this.fileName;
                url = await novaReferencia.ref.getDownloadURL();

                break;

              default:
                this.$root.$emit("showAlert::show", {
                  type: "danger",
                  message:
                    "Um erro inesperado aconteceu durante o carregamneto da foto de perfil",
                  titulo: "Erro",
                });
                break;
            }

            const { nome } = this.item_utilizador;

            await this.$firebase
              .firestore()
              .collection("users")
              .doc(id)
              .update({
                ...this.item_utilizador,
                createdAt: new Date().getTime(),
                url_image: url,
              })
              .then(() => {
                // Consultar se esse usuario de acesso estudante ja foi matriculado
                const doc = this.$firebase
                  .firestore()
                  .collection("estudantes")
                  .doc(id);

                if (doc.exists) {
                  this.$firebase
                    .firestore()
                    .collection("estudantes")
                    .doc(id)
                    .update({
                      nome,
                      createdAt: new Date().getTime(),
                      url_image: url,
                    })
                    .then(() => {
                      this.$root.$emit("showAlert::show", {
                        type: "success",
                        message: "Actualização realizada com sucesso",
                        titulo: "Sucesso",
                      });
                    });
                } else {
                  this.$root.$emit("showAlert::show", {
                    type: "success",
                    message: "Actualização realizada com sucesso",
                    titulo: "Sucesso",
                  });
                }
              });
          }
        } catch (e) {
          console.log(e.message);
        } finally {
          this.loading = false;
          this.cleanFormUtilizador();
          this.carregarutilizadores();
        }
      }
    },

    //apagar utilizador
    async apagar(id) {
      console.log(id);
      this.loading = true;
      this.cleanFormUtilizador();
      if (this.idDelete) {
        await this.$firebase
          .firestore()
          .collection("users")
          .doc(id)
          .get()
          .then((snapshot) => {
            this.item_utilizador = snapshot.data();
            this.oldImage = snapshot.data().image_name;
            try {
              if (this.item_utilizador.acesso == "estudante") {
                this.$firebase.firestore().collection("users").doc(id).delete();

                const e = this.$firebase
                  .firestore()
                  .collection("estudantes")
                  .doc(id);
                if (e.exists) {
                  this.$firebase
                    .firestore()
                    .collection("estudante")
                    .doc(id)
                    .delete()
                    .then(() => {
                      // Apaga a antiga imagem no Storage
                      const storage = getStorage();
                      const delRef = ref(
                        storage,
                        "imagens/perfil/" + this.oldImage
                      );
                      deleteObject(delRef).then(() => {
                        this.$root.$emit("showAlert::show", {
                          type: "success",
                          message:
                            "Informações de utilizador apagada com sucesso",
                          titulo: "Sucesso",
                        });
                      });
                    })
                    .catch(() => {
                      this.$root.$emit("showAlert::show", {
                        type: "danger",
                        message:
                          "Houve um erro inesperado durante o processo de deleção",
                        titulo: "Erro",
                      });
                    });
                } else {
                  console.log("Nao existe");
                }
              } else if (
                this.item_utilizador.acesso == "professor" ||
                this.item_utilizador.acesso == "medico" ||
                this.item_utilizador.acesso == "enfermeiro"
              ) {
                this.$firebase.firestore().collection("users").doc(id).delete();

                const e = this.$firebase
                  .firestore()
                  .collection("funcionarios")
                  .doc(id);
                if (e.exists) {
                  this.$firebase
                    .firestore()
                    .collection("funcionarios")
                    .doc(id)
                    .delete()
                    .then(() => {
                      // Apaga a antiga imagem no Storage
                      const storage = getStorage();
                      const delRef = ref(
                        storage,
                        "imagens/perfil/" + this.oldImage
                      );
                      deleteObject(delRef).then(() => {
                        this.$root.$emit("showAlert::show", {
                          type: "success",
                          message:
                            "Informações de utilizador apagada com sucesso",
                          titulo: "Sucesso",
                        });
                      });
                    })
                    .catch(() => {
                      this.$root.$emit("showAlert::show", {
                        type: "danger",
                        message:
                          "Houve um erro inesperado durante o processo de deleção",
                        titulo: "Erro",
                      });
                    });
                } else {
                  console.log("Nao existe");
                }
              } else if (this.item_utilizador.acesso == "paciente") {
                this.$firebase.firestore().collection("users").doc(id).delete();

                const e = this.$firebase
                  .firestore()
                  .collection("paciente")
                  .doc(id);
                if (e.exists) {
                  this.$firebase
                    .firestore()
                    .collection("paciente")
                    .doc(id)
                    .delete()
                    .then(() => {
                      // Apaga a antiga imagem no Storage
                      const storage = getStorage();
                      const delRef = ref(
                        storage,
                        "imagens/perfil/" + this.oldImage
                      );
                      deleteObject(delRef).then(() => {
                        this.$root.$emit("showAlert::show", {
                          type: "success",
                          message:
                            "Informações de utilizador apagada com sucesso",
                          titulo: "Sucesso",
                        });
                      });
                    })
                    .catch(() => {
                      this.$root.$emit("showAlert::show", {
                        type: "danger",
                        message:
                          "Houve um erro inesperado durante o processo de deleção",
                        titulo: "Erro",
                      });
                    });
                } else {
                  console.log("Nao existe");
                }
              }
            } catch (error) {
              this.$root.$emit("showAlert::show", {
                type: "danger",
                message:
                  "Houve um erro ao carregar as informações do utilizadore, verifica sua conexão com a internet",
                titulo: "Erro",
              });
            } finally {
              this.loading = false;
              this.carregarutilizadores();
            }
          });
      }
    }, //fim apagar utilizador

    openFile() {
      this.$refs.myFile.value = "";
      this.$refs.myFile.click();
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    formatoDeData() {
      return moment(this.utilizadores.data_criacao).format("DD-MM-YYYY");
    },

    async salvar_estudante(id, image) {
      this.erros = [];
      this.validarCampos();
      if (this.erros.length > 0) {
        this.validarCampos();
      } else {
        try {
          this.loading = true;

          let url2 = "";
          let url3 = "";
          // Verfica se existe uma estudante com o mesmo número de blilhete
          const verifiestudante = await this.$firebase
            .firestore()
            .collection("estudantes")
            .where("num_bilhete", "==", this.item_estudante.num_bilhete)
            .get();

          if (!verifiestudante.empty) {
            this.$root.$emit("showAlert::show", {
              type: "danger",
              message: "O estudante que pretendes cadastrar já existe...",
              titulo: "Erro",
            });
            this.loading = false;
            return;
          }

          // upload de documento bilhete

          const fileRefBilhete = await this.$firebase
            .storage()
            .ref("estudantes/doc/bilhetes")
            .child(this.fileNameBilhete)
            .put(this.item_estudante.url_file_bilhete);
          this.item_estudante.file_name_bilhete = this.fileNameBilhete;
          url2 = await fileRefBilhete.ref.getDownloadURL();

          // upload de documento Certificado

          const fileRefCertificado = await this.$firebase
            .storage()
            .ref("estudantes/doc/certificados")
            .child(this.fileNameCertificado)
            .put(this.item_estudante.url_file_certificado);
          this.item_estudante.file_name_certificado = this.fileNameCertificado;
          url3 = await fileRefCertificado.ref.getDownloadURL();

          // Cadastrar estudante
          await this.$firebase
            .firestore()
            .collection("estudantes")
            .doc(id)
            .set({
              ...this.item_estudante,
              url_image: image,
              data_criacao: new Date().getTime(),
              url_file_bilhete: url2,
              url_file_certificado: url3,
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Estudante cadastrado com sucesso...",
                titulo: "Sucesso",
              });
            });
        } catch (e) {
          if (e instanceof TypeError) {
            console.log(TypeError);
            switch (e.message) {
              case "Firebase: Error (auth/email-already-in-use).":
                break;

              default:
                this.$root.$emit("showAlert::show", {
                  type: "danger",
                  message: "Ocorreu um erro inesperado durante o cadastro...",
                  titulo: "Erro",
                });
                break;
            }
          }
        } finally {
          this.loading = false;
          this.cleanFormEstudante();
        }
      }
    },
    async salvar_paciente(id, image) {
      this.erros = [];
      this.validarCamposPaciente();
      if (this.erros.length > 0) {
        this.validarCamposPaciente();
      } else {
        try {
          this.loading = true;
          const instituationID = window.uid;

          // Verfica se existe um paciente com o mesmo número de blilhete
          const verifiPaciente = await this.$firebase
            .firestore()
            .collection("pacientes")
            .where("num_bilhete", "==", this.item_paciente.num_bilhete)
            .get();

          if (!verifiPaciente.empty) {
            this.$root.$emit("showAlert::show", {
              type: "danger",
              message: "O paciente que pretendes registar já existe...",
              titulo: "Erro",
            });
            this.loading = false;
            return;
          }
          // Cadastrar paciente
          await this.$firebase
            .firestore()
            .collection("pacientes")
            .doc(id)
            .set({
              ...this.item_paciente,
              url_image: image,
              idInstituation: instituationID,
              data_criacao: new Date().getTime(),
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Paciente registado com sucesso...",
                titulo: "Sucesso",
              });
            });
        } catch (e) {
          if (e instanceof TypeError) {
            console.log(TypeError);
            switch (e.message) {
              case "Firebase: Error (auth/email-already-in-use).":
                break;

              default:
                this.$root.$emit("showAlert::show", {
                  type: "danger",
                  message: "Ocorreu um erro inesperado durante o cadastro...",
                  titulo: "Erro",
                });
                break;
            }
          }
        } finally {
          this.loading = false;
          this.cleanFormPaciente();
        }
      }
    },
    async salvar_funcionario(id, image) {
      this.erros = [];
      this.validarCamposFuncionario();
      if (this.erros.length > 0) {
        this.validarCamposFuncionario();
      } else {
        try {
          this.loading = true;
          const instituationID = window.uid;

          let url2 = "";
          let url3 = "";
          // Verfica se existe uma estudante com o mesmo número de blilhete
          const verifiFuncionario = await this.$firebase
            .firestore()
            .collection("funcionarios")
            .where("num_bilhete", "==", this.item_funcionario.num_bilhete)
            .get();

          if (!verifiFuncionario.empty) {
            this.$root.$emit("showAlert::show", {
              type: "danger",
              message: "O funcionario que pretendes cadastrar já existe...",
              titulo: "Erro",
            });
            this.loading = false;
            return;
          }

          // upload de documento bilhete

          const fileRefBilhete = await this.$firebase
            .storage()
            .ref("funcionarios/doc/bilhetes")
            .child(this.fileNameBilheteFuncionario)
            .put(this.item_funcionario.url_file_bilhete);
          this.item_funcionario.file_name_bilhete =
            this.fileNameBilheteFuncionario;
          url2 = await fileRefBilhete.ref.getDownloadURL();

          // upload de documento Certificado

          const fileRefCertificado = await this.$firebase
            .storage()
            .ref("funcionarios/doc/certificados")
            .child(this.fileNameCertificadoFuncionario)
            .put(this.item_funcionario.url_file_certificado);
          this.item_funcionario.file_name_certificado =
            this.fileNameCertificadoFuncionario;
          url3 = await fileRefCertificado.ref.getDownloadURL();

          // Cadastrar funcionario
          await this.$firebase
            .firestore()
            .collection("funcionarios")
            .doc(id)
            .set({
              ...this.item_funcionario,
              url_image: image,
              idInstituation: instituationID,
              data_criacao: new Date().getTime(),
              url_file_bilhete: url2,
              url_file_certificado: url3,
            })
            .then(() => {
              this.$root.$emit("showAlert::show", {
                type: "success",
                message: "Funcionario registado com sucesso...",
                titulo: "Sucesso",
              });
            });
        } catch (e) {
          if (e instanceof TypeError) {
            console.log(e.message);
            switch (e.code) {
              case "auth/email-already-in-use":
                break;

              default:
                this.$root.$emit("showAlert::show", {
                  type: "danger",
                  message: "Ocorreu um erro inesperado durante o registo...",
                  titulo: "Erro",
                });
                break;
            }
          }
        } finally {
          this.loading = false;
          this.cleanFormFuncionario();
        }
      }
    },
    async liberarAcesso(id) {
      try {
        this.loading = true;
        await this.$firebase
          .firestore()
          .collection("users")
          .doc(id)
          .update({
            status: "activo",
          })
          .then((snapshot) => {
            console.log("Liberado com sucesso - " + snapshot);
            this.carregarutilizadores();
          });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    async bloquearAcesso(id) {
      try {
        this.loading = true;
        await this.$firebase
          .firestore()
          .collection("users")
          .doc(id)
          .update({
            status: "inactivo",
          })
          .then((snapshot) => {
            console.log("Bloqueado com sucesso - " + snapshot);
            this.carregarutilizadores();
          });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 5rem;
  height: 5rem;
}

b-button .bt-detalhes {
  background-color: white !important;
  border: none !important;
}
</style>
