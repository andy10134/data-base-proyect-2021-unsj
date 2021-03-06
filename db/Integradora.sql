PGDMP     9    *                y         
   Integrador    13.3    13.2 >               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16680 
   Integrador    DATABASE     l   CREATE DATABASE "Integrador" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Argentina.1252';
    DROP DATABASE "Integrador";
                postgres    false            ?            1259    16889    asiste    TABLE     |  CREATE TABLE public.asiste (
    emailcliente character varying(30) NOT NULL,
    email character varying(30) NOT NULL,
    nombre character varying(30) NOT NULL,
    nombredia character varying(30) NOT NULL,
    numero integer NOT NULL,
    codinst integer NOT NULL,
    inicio time without time zone NOT NULL,
    fin time without time zone NOT NULL,
    fecha date NOT NULL
);
    DROP TABLE public.asiste;
       public         heap    postgres    false            ?            1259    16726    dia    TABLE     J   CREATE TABLE public.dia (
    nombredia character varying(30) NOT NULL
);
    DROP TABLE public.dia;
       public         heap    postgres    false            ?            1259    16864    dicta    TABLE     1  CREATE TABLE public.dicta (
    email character varying(30) NOT NULL,
    nombre character varying(30) NOT NULL,
    nombredia character varying(30) NOT NULL,
    numero integer NOT NULL,
    codinst integer NOT NULL,
    inicio time without time zone NOT NULL,
    fin time without time zone NOT NULL
);
    DROP TABLE public.dicta;
       public         heap    postgres    false            ?            1259    16754 
   disciplina    TABLE     N   CREATE TABLE public.disciplina (
    nombre character varying(30) NOT NULL
);
    DROP TABLE public.disciplina;
       public         heap    postgres    false            ?            1259    16681    genero    TABLE     P   CREATE TABLE public.genero (
    nombregenero character varying(30) NOT NULL
);
    DROP TABLE public.genero;
       public         heap    postgres    false            ?            1259    16731    horario    TABLE     ?   CREATE TABLE public.horario (
    nombredia character varying(30) NOT NULL,
    codinst integer NOT NULL,
    inicio character varying(30) NOT NULL,
    fin character varying(30) NOT NULL
);
    DROP TABLE public.horario;
       public         heap    postgres    false            ?            1259    16849    inscripcion    TABLE       CREATE TABLE public.inscripcion (
    nombre character varying(30) NOT NULL,
    codinst integer NOT NULL,
    email character varying(30) NOT NULL,
    num_insc integer NOT NULL,
    diaexpiracion date,
    fecha_pago date,
    monto integer,
    cant_clases integer
);
    DROP TABLE public.inscripcion;
       public         heap    postgres    false            ?            1259    16686    institucion    TABLE     ?   CREATE TABLE public.institucion (
    codinst integer NOT NULL,
    nombre character varying(30),
    direccion character varying(30),
    telefono character varying(30)
);
    DROP TABLE public.institucion;
       public         heap    postgres    false                       0    0    TABLE institucion    ACL     ;   GRANT INSERT,UPDATE ON TABLE public.institucion TO admin1;
          public          postgres    false    201            ?            1259    16759    puede    TABLE     s   CREATE TABLE public.puede (
    nombre character varying(30) NOT NULL,
    email character varying(30) NOT NULL
);
    DROP TABLE public.puede;
       public         heap    postgres    false            ?            1259    16706    redes_sociales    TABLE     p   CREATE TABLE public.redes_sociales (
    codinst integer NOT NULL,
    redess character varying(30) NOT NULL
);
 "   DROP TABLE public.redes_sociales;
       public         heap    postgres    false            ?            1259    16716    sala    TABLE     o   CREATE TABLE public.sala (
    numero integer NOT NULL,
    codinst integer NOT NULL,
    capacidad integer
);
    DROP TABLE public.sala;
       public         heap    postgres    false            ?            1259    16824    tiene    TABLE     ?   CREATE TABLE public.tiene (
    codinst integer NOT NULL,
    nombre character varying(30) NOT NULL,
    precio_clase integer,
    descripcion character varying(30)
);
    DROP TABLE public.tiene;
       public         heap    postgres    false            ?            1259    16691    usuario    TABLE     ?  CREATE TABLE public.usuario (
    email character varying(30) NOT NULL,
    nombre character varying(30),
    apellido character varying(30),
    numero_telefono character varying(30),
    nombredeusuario character varying(30),
    "contraseña" character varying(30),
    fecha_de_nacimiento character varying(30),
    nombregenero character varying(30),
    tipo_usuario character varying(30),
    codinst integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            
          0    16889    asiste 
   TABLE DATA           m   COPY public.asiste (emailcliente, email, nombre, nombredia, numero, codinst, inicio, fin, fecha) FROM stdin;
    public          postgres    false    212   PN                 0    16726    dia 
   TABLE DATA           (   COPY public.dia (nombredia) FROM stdin;
    public          postgres    false    205   ?N       	          0    16864    dicta 
   TABLE DATA           W   COPY public.dicta (email, nombre, nombredia, numero, codinst, inicio, fin) FROM stdin;
    public          postgres    false    211   ?N                 0    16754 
   disciplina 
   TABLE DATA           ,   COPY public.disciplina (nombre) FROM stdin;
    public          postgres    false    207   HO       ?          0    16681    genero 
   TABLE DATA           .   COPY public.genero (nombregenero) FROM stdin;
    public          postgres    false    200   oO                 0    16731    horario 
   TABLE DATA           B   COPY public.horario (nombredia, codinst, inicio, fin) FROM stdin;
    public          postgres    false    206   ?O                 0    16849    inscripcion 
   TABLE DATA           v   COPY public.inscripcion (nombre, codinst, email, num_insc, diaexpiracion, fecha_pago, monto, cant_clases) FROM stdin;
    public          postgres    false    210   ?O       ?          0    16686    institucion 
   TABLE DATA           K   COPY public.institucion (codinst, nombre, direccion, telefono) FROM stdin;
    public          postgres    false    201   ,P                 0    16759    puede 
   TABLE DATA           .   COPY public.puede (nombre, email) FROM stdin;
    public          postgres    false    208   ?P                 0    16706    redes_sociales 
   TABLE DATA           9   COPY public.redes_sociales (codinst, redess) FROM stdin;
    public          postgres    false    203   ?P                 0    16716    sala 
   TABLE DATA           :   COPY public.sala (numero, codinst, capacidad) FROM stdin;
    public          postgres    false    204   Q                 0    16824    tiene 
   TABLE DATA           K   COPY public.tiene (codinst, nombre, precio_clase, descripcion) FROM stdin;
    public          postgres    false    209   9Q                  0    16691    usuario 
   TABLE DATA           ?   COPY public.usuario (email, nombre, apellido, numero_telefono, nombredeusuario, "contraseña", fecha_de_nacimiento, nombregenero, tipo_usuario, codinst) FROM stdin;
    public          postgres    false    202   ?Q       i           2606    16893    asiste asiste_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public.asiste
    ADD CONSTRAINT asiste_pkey PRIMARY KEY (emailcliente, email, nombre, nombredia, numero, codinst, inicio, fin, fecha);
 <   ALTER TABLE ONLY public.asiste DROP CONSTRAINT asiste_pkey;
       public            postgres    false    212    212    212    212    212    212    212    212    212            [           2606    16730    dia dia_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.dia
    ADD CONSTRAINT dia_pkey PRIMARY KEY (nombredia);
 6   ALTER TABLE ONLY public.dia DROP CONSTRAINT dia_pkey;
       public            postgres    false    205            g           2606    16868    dicta dicta_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public.dicta
    ADD CONSTRAINT dicta_pkey PRIMARY KEY (email, nombre, nombredia, numero, codinst, inicio, fin);
 :   ALTER TABLE ONLY public.dicta DROP CONSTRAINT dicta_pkey;
       public            postgres    false    211    211    211    211    211    211    211            _           2606    16758    disciplina disciplina_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT disciplina_pkey PRIMARY KEY (nombre);
 D   ALTER TABLE ONLY public.disciplina DROP CONSTRAINT disciplina_pkey;
       public            postgres    false    207            Q           2606    16685    genero genero_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.genero
    ADD CONSTRAINT genero_pkey PRIMARY KEY (nombregenero);
 <   ALTER TABLE ONLY public.genero DROP CONSTRAINT genero_pkey;
       public            postgres    false    200            ]           2606    16735    horario horario_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.horario
    ADD CONSTRAINT horario_pkey PRIMARY KEY (nombredia, codinst, inicio, fin);
 >   ALTER TABLE ONLY public.horario DROP CONSTRAINT horario_pkey;
       public            postgres    false    206    206    206    206            e           2606    16853    inscripcion inscripcion_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.inscripcion
    ADD CONSTRAINT inscripcion_pkey PRIMARY KEY (nombre, codinst, email, num_insc);
 F   ALTER TABLE ONLY public.inscripcion DROP CONSTRAINT inscripcion_pkey;
       public            postgres    false    210    210    210    210            S           2606    16690    institucion institucion_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.institucion
    ADD CONSTRAINT institucion_pkey PRIMARY KEY (codinst);
 F   ALTER TABLE ONLY public.institucion DROP CONSTRAINT institucion_pkey;
       public            postgres    false    201            a           2606    16763    puede puede_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.puede
    ADD CONSTRAINT puede_pkey PRIMARY KEY (nombre, email);
 :   ALTER TABLE ONLY public.puede DROP CONSTRAINT puede_pkey;
       public            postgres    false    208    208            W           2606    16710 "   redes_sociales redes_sociales_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.redes_sociales
    ADD CONSTRAINT redes_sociales_pkey PRIMARY KEY (codinst, redess);
 L   ALTER TABLE ONLY public.redes_sociales DROP CONSTRAINT redes_sociales_pkey;
       public            postgres    false    203    203            Y           2606    16720    sala sala_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.sala
    ADD CONSTRAINT sala_pkey PRIMARY KEY (numero, codinst);
 8   ALTER TABLE ONLY public.sala DROP CONSTRAINT sala_pkey;
       public            postgres    false    204    204            c           2606    16828    tiene tiene_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.tiene
    ADD CONSTRAINT tiene_pkey PRIMARY KEY (codinst, nombre);
 :   ALTER TABLE ONLY public.tiene DROP CONSTRAINT tiene_pkey;
       public            postgres    false    209    209            U           2606    16695    usuario usuario_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (email);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    202            z           2606    16894 C   asiste asiste_email_nombre_nombredia_numero_codinst_inicio_fin_fkey    FK CONSTRAINT       ALTER TABLE ONLY public.asiste
    ADD CONSTRAINT asiste_email_nombre_nombredia_numero_codinst_inicio_fin_fkey FOREIGN KEY (email, nombre, nombredia, numero, codinst, inicio, fin) REFERENCES public.dicta(email, nombre, nombredia, numero, codinst, inicio, fin);
 m   ALTER TABLE ONLY public.asiste DROP CONSTRAINT asiste_email_nombre_nombredia_numero_codinst_inicio_fin_fkey;
       public          postgres    false    211    211    211    212    211    212    211    212    2919    212    211    212    212    212    211            {           2606    16899    asiste asiste_emailcliente_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.asiste
    ADD CONSTRAINT asiste_emailcliente_fkey FOREIGN KEY (emailcliente) REFERENCES public.usuario(email);
 I   ALTER TABLE ONLY public.asiste DROP CONSTRAINT asiste_emailcliente_fkey;
       public          postgres    false    2901    202    212            v           2606    16869    dicta dicta_email_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.dicta
    ADD CONSTRAINT dicta_email_fkey FOREIGN KEY (email) REFERENCES public.usuario(email);
 @   ALTER TABLE ONLY public.dicta DROP CONSTRAINT dicta_email_fkey;
       public          postgres    false    211    2901    202            w           2606    16874    dicta dicta_nombre_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.dicta
    ADD CONSTRAINT dicta_nombre_fkey FOREIGN KEY (nombre) REFERENCES public.disciplina(nombre);
 A   ALTER TABLE ONLY public.dicta DROP CONSTRAINT dicta_nombre_fkey;
       public          postgres    false    211    2911    207            x           2606    16879    dicta dicta_nombredia_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.dicta
    ADD CONSTRAINT dicta_nombredia_fkey FOREIGN KEY (nombredia) REFERENCES public.dia(nombredia);
 D   ALTER TABLE ONLY public.dicta DROP CONSTRAINT dicta_nombredia_fkey;
       public          postgres    false    2907    205    211            y           2606    16884    dicta dicta_numero_codinst_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.dicta
    ADD CONSTRAINT dicta_numero_codinst_fkey FOREIGN KEY (numero, codinst) REFERENCES public.sala(numero, codinst);
 I   ALTER TABLE ONLY public.dicta DROP CONSTRAINT dicta_numero_codinst_fkey;
       public          postgres    false    211    2905    204    204    211            n           2606    16736    horario horario_codinst_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.horario
    ADD CONSTRAINT horario_codinst_fkey FOREIGN KEY (codinst) REFERENCES public.institucion(codinst);
 F   ALTER TABLE ONLY public.horario DROP CONSTRAINT horario_codinst_fkey;
       public          postgres    false    201    2899    206            o           2606    16741    horario horario_nombredia_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.horario
    ADD CONSTRAINT horario_nombredia_fkey FOREIGN KEY (nombredia) REFERENCES public.dia(nombredia);
 H   ALTER TABLE ONLY public.horario DROP CONSTRAINT horario_nombredia_fkey;
       public          postgres    false    205    206    2907            u           2606    16859 +   inscripcion inscripcion_codinst_nombre_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.inscripcion
    ADD CONSTRAINT inscripcion_codinst_nombre_fkey FOREIGN KEY (codinst, nombre) REFERENCES public.tiene(codinst, nombre);
 U   ALTER TABLE ONLY public.inscripcion DROP CONSTRAINT inscripcion_codinst_nombre_fkey;
       public          postgres    false    209    210    209    210    2915            t           2606    16854 "   inscripcion inscripcion_email_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.inscripcion
    ADD CONSTRAINT inscripcion_email_fkey FOREIGN KEY (email) REFERENCES public.usuario(email);
 L   ALTER TABLE ONLY public.inscripcion DROP CONSTRAINT inscripcion_email_fkey;
       public          postgres    false    202    210    2901            q           2606    16769    puede puede_email_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.puede
    ADD CONSTRAINT puede_email_fkey FOREIGN KEY (email) REFERENCES public.usuario(email);
 @   ALTER TABLE ONLY public.puede DROP CONSTRAINT puede_email_fkey;
       public          postgres    false    2901    202    208            p           2606    16764    puede puede_nombre_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.puede
    ADD CONSTRAINT puede_nombre_fkey FOREIGN KEY (nombre) REFERENCES public.disciplina(nombre);
 A   ALTER TABLE ONLY public.puede DROP CONSTRAINT puede_nombre_fkey;
       public          postgres    false    2911    208    207            l           2606    16711 *   redes_sociales redes_sociales_codinst_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.redes_sociales
    ADD CONSTRAINT redes_sociales_codinst_fkey FOREIGN KEY (codinst) REFERENCES public.institucion(codinst);
 T   ALTER TABLE ONLY public.redes_sociales DROP CONSTRAINT redes_sociales_codinst_fkey;
       public          postgres    false    201    203    2899            m           2606    16721    sala sala_codinst_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.sala
    ADD CONSTRAINT sala_codinst_fkey FOREIGN KEY (codinst) REFERENCES public.institucion(codinst);
 @   ALTER TABLE ONLY public.sala DROP CONSTRAINT sala_codinst_fkey;
       public          postgres    false    2899    204    201            r           2606    16829    tiene tiene_codinst_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tiene
    ADD CONSTRAINT tiene_codinst_fkey FOREIGN KEY (codinst) REFERENCES public.institucion(codinst);
 B   ALTER TABLE ONLY public.tiene DROP CONSTRAINT tiene_codinst_fkey;
       public          postgres    false    209    2899    201            s           2606    16834    tiene tiene_nombre_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.tiene
    ADD CONSTRAINT tiene_nombre_fkey FOREIGN KEY (nombre) REFERENCES public.disciplina(nombre);
 A   ALTER TABLE ONLY public.tiene DROP CONSTRAINT tiene_nombre_fkey;
       public          postgres    false    2911    207    209            k           2606    16701    usuario usuario_codinst_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_codinst_fkey FOREIGN KEY (codinst) REFERENCES public.institucion(codinst);
 F   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_codinst_fkey;
       public          postgres    false    202    201    2899            j           2606    16696 !   usuario usuario_nombregenero_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_nombregenero_fkey FOREIGN KEY (nombregenero) REFERENCES public.genero(nombregenero);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_nombregenero_fkey;
       public          postgres    false    2897    202    200            
   S   x??J,?,??)KtH?M???K??????+IM/Mu??/?F??&%r?&??s?????q?AFF?????\1z\\\ ??c         9   x??)?K-??M,*Q??E??9@?Wij?

????S??\?s3????b???? a?j      	   <   x????+IM/Mu??/?M???K????*?MJ??M,*I-?4AS+ ?44?0?b???? x??            x???u??*?MJ?????? !??      ?      x??M,N.?????rK?M?1b???? m@?         1   x??)?K-?4?44?20 "NC3+c??7??(e?J?C\1z\\\ ??8         ?   x??*?MJ?4??J,?,??)KtH?M???K???4?4202?50?52?2?@LsN?=... P?n      ?   \   x?3?(-?Wp?,?K-.???/VH?,J,??I-V0?0T??/*I?412???0?2??-?K?Wp????M????K?@j?M??b???? ??         (   x??*?MJ????+IM/Mu??/?M???K???????? Ű
?         .   x?3?tKLNM????2?)?,)I-?2???+.IL/J??????? ?)            x?3?4?42?2?4?46?????? cq         C   x?3???u?420?t??)H-VH+M-*I-?2??*?MJ?425??-M??W??/???L?+??????? ?D          ?   x?M??j!??????,???B ???r???Ƣ?n o_??vA>??????]?S$vG?xB8q???????/???_??????8?<,u??u?>??d9?o??ه;m,??\?K?͡?E???a?|?G?7?D???e?p=?ȩ?iq????w7????P?????????k?tv?*?Z?N???-???ڡ??;!?bz_?     