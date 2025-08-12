<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <link href="static/css/style.css" rel="stylesheet" />
    <script type="module" src="static/js/script.js"></script>
    <title>Document</title>
  </head>
  <body class="bggray-50 text-stone-800 grid h-dvh">
    <%-- #################### NAVBAR WRAPPER START #################### --%>
    <div class="flex flex-col border-b-stone-100 transition-all duration-300">
      <%-- #################### NAVAR START #################### --%>
      <nav
        class="flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-3"
      >
        <a href="#">
          <img
            src="static/media/images/logo.png"
            alt="logo"
            class="h-7.5 md:h-10"
          />
        </a>
        <div class="md:flex items-center gap-4 hidden">
          <a
            href="#"
            class="hover:text-blue-700 transition-all duration-300 focus:outline-none focus:text-blue-700 font-medium"
            >Home</a
          >
          <a
            href="#"
            class="hover:text-blue-700 transition-all duration-300 focus:outline-none focus:text-blue-700 font-medium"
            >Services</a
          >
          <a
            href="#"
            class="hover:text-blue-700 transition-all duration-300 focus:outline-none focus:text-blue-700 font-medium"
            >About</a
          >
          <a
            href="#"
            class="hover:text-blue-700 transition-all duration-300 focus:outline-none focus:text-blue-700 font-medium"
            >Contact</a
          >
        </div>
        <div class="flex items-center gap-4">
          <a
            href="#"
            class="capitalize bg-blue-600 text-stone-100 font-medium px-5 py-1 md:px-6 md:py-2 focus:outline-none focus:ring-2 focus:ring-2-blue-500 border-none rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
          >
            Login
          </a>

          <button
            data-collapse-toggle="navbar-hamburger"
            type="button"
            class="menu md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
            aria-controls="navbar-hamburger"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
      <%-- #################### NAVAR END #################### --%> <%--
      #################### MENU LINKS START #################### --%>
      <div
        class="flex flex-col border-b border-stone-300 transition-all duration-300 relative"
      >
        <nav class="flex items-center justify-between ...">
          <!-- navbar items -->
        </nav>

        <div
          id="navbar-hamburger"
          class="absolute top-full left-0 right-0 max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out w-full z-50"
        >
          <ul class="flex flex-col font-medium rounded-lg bg-gray-50 shadow-md">
            <li>
              <a
                href="#"
                class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#"
                class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
                >Services</a
              >
            </li>
            <li>
              <a
                href="#"
                class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
                >About</a
              >
            </li>
            <li>
              <a
                href="#"
                class="menu-nav-link block py-2 px-3 hover:bg-gray-100"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
      <%-- #################### MENU LINKS END #################### --%>
    </div>
    <%-- #################### NAVBAR WRAPPER END #################### --%>

    <section
      class="relative h-screen w-full bg-cover bg-center bg-[url('https://www.shutterstock.com/image-photo/tourist-bus-on-mountain-road-600nw-2444707101.jpg')]"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-800/40 to-gray-700/60"
      ></div>

      <!-- Content -->
      <div
        class="relative z-10 flex flex-col items-center justify-center h-100 text-center text-white px-4 gap-10"
      >
        <!-- Title & Subtitle -->
        <div class="flex items-center gap-1 md:gap-4 flex-col">
          <h1 class="text-3xl md:text-6xl lg:text-6xl font-bold drop-shadow-lg">
            Your Journey Begins with
            <span class="text-blue-400 capitalize">RoBus</span>
          </h1>
          <p
            class="text-lg md:text-2xl font-medium text-gray-200 drop-shadow-md"
          >
            Smooth & Easy Booking
          </p>
        </div>
      </div>
    </section>

    <section>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi odit
      similique maiores, libero repellat doloremque dolorem? Dolorem quasi porro
      blanditiis dolores quibusdam quos rerum. Incidunt iure quisquam totam
      neque cum. Quis reprehenderit aspernatur similique officia dignissimos
      quia eius a natus vero impedit ab et optio id voluptatibus quidem, nostrum
      ipsa dolores suscipit fugiat animi ducimus est incidunt placeat dolore.
      Aspernatur. Expedita ipsa sed earum quia voluptates atque pariatur
      consectetur possimus accusantium voluptatibus. Libero debitis doloribus
      praesentium in unde, voluptatibus vel laboriosam soluta quos a hic
      quibusdam nostrum consectetur amet quae! Numquam ea expedita quo,
      cupiditate fugit tenetur exercitationem possimus nobis praesentium aut
      voluptatibus optio. Praesentium perferendis modi suscipit asperiores
      voluptatibus eligendi harum id. Sed harum in perferendis consectetur
      voluptas id. Eveniet, in molestiae, facere deserunt sed voluptatum ut
      corporis amet distinctio iste recusandae unde labore minus nesciunt maxime
      commodi eum quaerat et. Tempora accusamus quaerat sed, aperiam assumenda
      porro amet? Ipsum neque autem deleniti, tempora, voluptas deserunt earum
      odit magni quisquam enim asperiores ipsa vitae excepturi. Provident eum
      vero consequuntur odit, totam ducimus ut a sint, rerum eveniet saepe nisi?
      Dolorum saepe eum repellendus vitae ratione laborum voluptate? Unde
      debitis assumenda vitae odit aperiam aliquid impedit fugit qui, facere
      praesentium blanditiis tempore quia delectus pariatur maiores.
      Exercitationem similique ab unde! Sed provident ullam dicta, magni impedit
      odit mollitia eius, soluta iure maxime ipsam? Aliquid officia nam nihil
      ipsam laboriosam illum architecto quia atque quam asperiores, error
      suscipit quaerat, at velit. Sit deserunt repellat iusto quia velit magnam
      maxime, quo vero deleniti molestias totam perferendis, ex earum maiores
      inventore soluta asperiores, cum quasi amet iste modi! Provident sint
      molestiae nostrum minima. Voluptas natus nemo possimus. Vero
      exercitationem officia ipsum iure dolores necessitatibus culpa atque
      laudantium eos ut voluptatum reiciendis nihil tenetur magnam numquam amet
      iusto, dolore quibusdam corrupti qui ad fuga! Veniam consectetur corporis
      delectus. Ab voluptate eos odit natus provident labore facere cum.
      Consequuntur delectus ad error. Explicabo voluptatum qui ex aliquam
      molestiae. Mollitia officiis qui, adipisci est fuga consequatur?
      Perspiciatis corrupti doloremque quo aliquid! Dignissimos veniam rerum
      modi quibusdam quod nesciunt quidem eum illo optio voluptatem nam, maxime
      necessitatibus fugit debitis, facere laudantium consectetur perferendis
      beatae totam repellat molestias. Distinctio exercitationem, amet similique
      laboriosam excepturi aspernatur voluptas eum doloribus vero fugiat dicta
      labore rem voluptatem quam qui praesentium nam aliquam dolorem dignissimos
      quae! Enim eos aliquid nisi harum quasi? Animi odit facilis aspernatur id
      ad ea suscipit velit vero, corporis debitis, illo est natus inventore.
      Quisquam nesciunt magnam ullam, non cum aspernatur, in consequatur
      perferendis, velit sed saepe incidunt. Fuga cumque consequatur pariatur
      adipisci reprehenderit odit nemo ut harum! Ullam, magni maxime. Quos
      totam, cupiditate molestias neque reprehenderit alias tempora dolorum
      adipisci dolor modi sit vitae natus, expedita iste. Nobis recusandae,
      architecto incidunt doloribus sint neque delectus qui, tempore voluptatum
      laboriosam alias quo totam commodi placeat vel nemo, similique hic laborum
      maiores vitae provident amet? Iste recusandae voluptatum id. Eveniet, odit
      aperiam! Sed, fuga modi. Molestiae, neque. Modi consectetur vitae ex,
      eaque quibusdam suscipit cum provident quidem aperiam reprehenderit
      expedita aliquid illum. Molestias vel eos molestiae. Magni, distinctio
      eveniet! Placeat voluptate quo rerum nisi voluptatum autem atque ex ipsam
      suscipit molestiae laboriosam, esse dolorem exercitationem fuga doloribus
      culpa dolorum ratione consequuntur veniam porro beatae iste ipsa.
      Molestias, nisi quas! Vero tempore sapiente esse ipsa perferendis animi.
      Ducimus, error? Architecto eum dolores deserunt iste exercitationem
      dolorum impedit voluptatum dolorem quis, tempora eligendi, ipsam sint,
      perferendis laboriosam facere quaerat quo repudiandae? Doloremque
      architecto molestias officiis quasi earum aspernatur repellendus sequi
      minima dignissimos dolorum! Dicta corrupti nobis eveniet optio,
      exercitationem ea fuga eius id porro obcaecati quisquam unde reprehenderit
      at perspiciatis beatae! Nemo ipsa iste ducimus porro maiores suscipit
      incidunt cumque voluptas expedita impedit eum reprehenderit numquam esse
      quos distinctio illo animi repudiandae cum eaque, aut accusamus dicta
      amet! Sed, explicabo et? Optio similique facilis aliquam, doloremque eum
      ad, ut est recusandae corporis labore corrupti maxime dolorum maiores
      provident totam laboriosam quasi nesciunt minima assumenda eligendi
      laudantium vel sit reprehenderit repellat. Esse. Quasi sapiente amet
      possimus eos assumenda quos error voluptatibus ab, accusantium dolore,
      quia, placeat ipsam sequi non nemo recusandae quam aliquam doloribus!
      Repellat repudiandae velit voluptatibus laborum, sapiente debitis
      adipisci? Delectus commodi ut cumque non eaque quis perferendis doloremque
      est velit veritatis aliquid consectetur veniam facere repudiandae odio
      recusandae voluptas eveniet, voluptate earum repellendus ipsam dolorem
      nostrum eum adipisci. Nostrum. Necessitatibus tempora dolorem omnis
      impedit enim maiores, praesentium veniam sunt exercitationem deserunt
      voluptate, ipsa veritatis magni doloremque culpa? Blanditiis quam
      assumenda magni fugit pariatur maiores harum perferendis quis dolor
      architecto? Tenetur explicabo illo libero in ipsam molestiae quis harum
      soluta dolorem architecto, quisquam illum corrupti error distinctio animi
      dolor minima possimus pariatur, molestias sunt delectus! At eius ut
      voluptate nostrum? Quo optio velit perferendis consequuntur facere aliquam
      fugiat ullam corrupti, at adipisci magnam ratione sit vero eligendi
      tempora nam in officia ea quia quas dicta itaque eveniet. Doloribus,
      fugiat eius. Iusto accusamus officia expedita eaque incidunt. Nostrum
      voluptatibus aperiam commodi, obcaecati pariatur beatae. Omnis architecto
      amet atque deleniti doloribus cum cumque dolore? Ducimus tempore ullam sit
      quod at! Ipsam, nulla! Magnam iure quos dolorem rerum magni perspiciatis
      voluptate architecto iusto a omnis, ratione repellat ipsam illum? Magni
      itaque at tenetur officia beatae, eaque, vero sint, assumenda fugit
      officiis sequi repudiandae. Ullam totam cum facere quasi vel assumenda
      repudiandae distinctio excepturi odio. Ut molestiae consequuntur ipsum,
      iusto ad deserunt praesentium suscipit, ex exercitationem nesciunt facere
      in iure, eius unde provident voluptate. Ab magni iusto autem. Pariatur quo
      doloribus officia nisi numquam cum odio placeat maxime quis, beatae at vel
      ipsam est voluptatum eveniet reprehenderit in expedita temporibus,
      quibusdam dolore sapiente vero? Voluptatibus rerum modi nemo, velit
      eligendi et? Blanditiis rerum inventore eos delectus eius, aliquid tempore
      natus laudantium voluptatibus distinctio fugit doloremque, possimus nobis
      mollitia, impedit unde ea eaque vel ducimus. Laborum labore autem,
      inventore distinctio tempore odio sit ex at qui praesentium expedita cum,
      eos commodi voluptate, excepturi laudantium quod corrupti saepe maxime
      corporis iusto. Minima nesciunt accusamus velit quod. Explicabo voluptates
      perferendis ut, ea, quibusdam ad eum nam voluptate fugiat molestias
      consectetur fuga quod sunt blanditiis vero commodi officia nemo nesciunt
      reiciendis pariatur porro! Maiores ad possimus culpa rerum. Quidem, dicta
      autem. Assumenda dignissimos rem et aliquam, totam nam accusantium quod
      perspiciatis distinctio omnis, odit autem labore asperiores! Aliquam qui
      totam ipsam esse commodi odit necessitatibus est excepturi maiores. Ipsa
      quo ad id tempora in excepturi ullam, exercitationem quas quod omnis
      corporis enim sequi? Velit omnis, aperiam eius reiciendis, molestias
      necessitatibus unde corrupti quod consectetur, sint sed expedita labore.
      Cum, tenetur voluptatem amet incidunt dolorem minus ex hic, delectus
      corporis veritatis quidem doloribus ab aliquid maxime repellendus
      sapiente, expedita qui dignissimos. Veniam cum, cupiditate quam mollitia
      minus id excepturi? Iure recusandae delectus, eveniet vel ducimus,
      repellendus eos fugiat, quia maiores optio quam corporis! Deleniti,
      tenetur! Molestias, perferendis quia assumenda fugit odio voluptas, quo,
      nulla possimus ut ad ipsam veritatis. Ullam minima reiciendis odit commodi
      eum quod dolore eveniet similique, in pariatur iste blanditiis laboriosam
      aperiam incidunt qui quaerat at natus, modi fugiat ex velit debitis harum.
      Expedita, consequuntur mollitia? Magni est, nisi culpa adipisci mollitia
      neque sapiente doloribus? Odio ab ipsa tempora? Laudantium ipsum voluptas
      illo cupiditate? Est ducimus aperiam ea delectus ut asperiores accusantium
      esse quis. Numquam, totam. Incidunt unde nesciunt, sunt libero assumenda
      ipsam quos illum dolorum iusto, cum tempora repellendus molestiae quidem
      aspernatur voluptate recusandae, illo placeat! Odit voluptatum repudiandae
      commodi laboriosam numquam quasi cupiditate quidem! Rem pariatur autem
      nesciunt maiores tenetur ut impedit laborum molestiae incidunt quae illo,
      voluptatum blanditiis fuga vero consequatur et asperiores illum
      repudiandae praesentium! Saepe pariatur in perferendis fugit numquam eius!
      Esse, nobis dignissimos ducimus, illo, eveniet odit a et incidunt repellat
      aliquid quos atque veritatis. Exercitationem libero, quo reiciendis
      maiores, ipsa voluptatem expedita distinctio quia molestias aspernatur,
      iste delectus modi? Nobis, quisquam cupiditate repudiandae beatae voluptas
      suscipit. Repellat, quam vel explicabo maiores nisi delectus. Aut possimus
      enim saepe soluta rerum! Nulla aspernatur cumque vitae minus cupiditate
      commodi, corrupti incidunt voluptatibus! Excepturi sint doloribus quos
      expedita fugiat voluptatibus ut dolor, porro sequi provident ab est ipsa
      quasi. Cupiditate iusto minima dolorum quos at numquam libero iste
      voluptas, obcaecati, qui sunt error? Ex quas nisi tempore quasi,
      laudantium aut repudiandae. Eius rerum aliquid quo minima aliquam laborum,
      adipisci consequuntur numquam quam sapiente quaerat quis et, nihil nam
      atque illo. Consequuntur, voluptatum at? Porro placeat fugit voluptatibus
      reprehenderit quos, omnis quae ex, quis exercitationem ea blanditiis
      voluptatum vitae possimus! Totam tempore hic, delectus dolores autem sint,
      cum, id animi repudiandae maxime nam veritatis! Commodi vero similique
      laborum a est officia animi iusto ut veritatis molestias mollitia
      voluptatibus aperiam enim maxime consequatur voluptate explicabo, iure
      earum hic. Voluptate pariatur accusantium omnis neque dolore quod?
      Laborum, suscipit! Quasi rem, architecto quidem magnam nihil sunt
      distinctio neque obcaecati debitis, alias exercitationem deserunt nisi
      assumenda aliquid adipisci id porro optio velit, voluptatem blanditiis
      magni? Totam, culpa incidunt? Sed dolores sapiente ratione quidem illo
      perferendis autem suscipit repellendus adipisci, ad esse recusandae
      incidunt earum odio accusantium ut molestias, quas corporis corrupti! Id,
      odit debitis officiis iste quod aspernatur! Enim reprehenderit error neque
      possimus veniam sint molestiae optio deleniti, quis harum? Culpa, pariatur
      minus accusantium unde libero necessitatibus quod rem impedit nulla alias
      mollitia odit saepe at eaque quae! Reiciendis et voluptates veniam aut,
      accusamus praesentium ipsa, est, animi laboriosam voluptas tenetur debitis
      dolore tempora iusto. Nulla distinctio ex, veniam quas fugit esse,
      voluptatum nesciunt odio possimus tenetur quidem. Eos, omnis! Vel, aperiam
      totam. Impedit qui repellendus, exercitationem vel deleniti est odit
      eveniet eum atque ut adipisci temporibus optio consequuntur, dignissimos
      facilis alias dolorum provident minima cupiditate veritatis assumenda!
      Nobis blanditiis dolor optio vel dignissimos corrupti, exercitationem
      dolorum deleniti fugiat totam tempore rem nisi porro illum iste
      consectetur adipisci quae. Perferendis numquam deleniti facilis ut neque
      facere officiis nobis! Assumenda alias laudantium doloremque similique
      ipsa aliquam repudiandae, eum ipsam maiores sequi magni numquam officiis
      sed? Architecto iure sed accusantium repellat vero dolore veniam
      consequuntur, ratione sit magni, aut cum! Vel explicabo mollitia hic natus
      ab nostrum alias odit cumque, aliquam atque aut rem quasi fugiat, amet
      sunt dignissimos, asperiores facilis sint voluptate quidem laudantium
      reprehenderit! Magni atque rem excepturi. Amet sint dolor facere quos unde
      ipsam in error quod consectetur alias. Nam, ullam neque minus commodi
      ratione aspernatur sapiente et enim maxime repellendus quos? Vitae quod
      iste itaque aspernatur? Sed quae accusamus, quas dicta hic voluptate ipsam
      fugit culpa sit dolor harum veritatis accusantium id distinctio? Nulla,
      esse provident! Qui pariatur optio iure odio repellendus tenetur
      necessitatibus enim explicabo. Illo unde esse dolore quisquam, aliquid
      fugiat, repellat velit hic, mollitia eveniet quo. Eveniet deleniti a
      earum, voluptatibus explicabo, mollitia quae quos libero quas autem ut?
      Soluta error neque blanditiis! Voluptas fugiat consectetur ratione
      corporis maxime distinctio dolores cumque placeat, eaque nisi cum. Nulla
      suscipit rem officiis animi voluptates atque expedita quo similique iusto
      voluptatem totam, adipisci optio fugit vero? Ex molestiae, dolore
      recusandae voluptas esse accusantium eligendi nesciunt perspiciatis
      explicabo assumenda veniam debitis reiciendis praesentium iste nostrum
      maxime, dolorum nam necessitatibus similique cum error libero quaerat quam
      corrupti? Rem! Enim deleniti ipsa mollitia velit dicta, est numquam quae.
      Debitis velit esse voluptatem in iste neque adipisci et magnam
      reprehenderit ullam dolores dolor alias totam ad eius repudiandae, beatae
      exercitationem! Illo sequi fugit natus nemo doloremque, voluptate eos
      suscipit ratione quo numquam optio consequuntur doloribus autem, eaque
      asperiores ad, facilis dolore! Alias, quas aperiam distinctio et molestias
      tempora quia doloremque. Animi ipsam molestias nisi perspiciatis, ab cum
      obcaecati harum sint maiores beatae. Provident, in sequi. Temporibus
      architecto exercitationem ducimus. Esse tenetur officia temporibus sit
      saepe culpa est voluptates id minus. Aliquid ducimus amet sint. Excepturi
      aliquid illum odio, placeat ea cupiditate dicta molestias laudantium autem
      rem neque ipsam itaque est natus tempora fugiat? Hic rem modi fugit totam
      eos et! Ab dicta qui nesciunt saepe repellendus! Aliquam facere
      exercitationem minima aspernatur nihil et vitae esse, harum placeat
      tenetur voluptatem, necessitatibus impedit! Consequuntur temporibus non
      nemo ea laboriosam alias corrupti delectus! Qui laudantium cumque,
      recusandae voluptatibus vero officia! Veniam culpa sapiente rerum,
      officiis odio deleniti quibusdam porro provident ipsa neque, animi fugiat
      ea tempore eos autem repudiandae! Amet at aut incidunt. Neque numquam,
      possimus maxime magni id libero ad odio illum ipsum natus facere,
      praesentium alias laudantium quo. Voluptatem amet ab autem, libero
      distinctio ipsam maiores ipsum dolorem ea dolores eaque? Incidunt magnam
      culpa cupiditate, dignissimos facere quod inventore, maxime aut dolores
      consequatur sapiente ut. Rerum ipsum repellat libero perspiciatis tempora
      sed a, ex dolorem necessitatibus assumenda cupiditate, sit accusantium!
      Voluptatum. Illum, in aut repellat, est laudantium, explicabo qui soluta
      voluptas quasi nam eligendi eum inventore unde et nostrum temporibus
      excepturi iusto mollitia? Ipsam in perferendis cumque obcaecati modi nobis
      ex. Quibusdam, ullam repudiandae maxime quia atque sapiente nemo commodi
      fugit, architecto asperiores dicta suscipit sed aspernatur impedit
      accusamus exercitationem praesentium voluptatibus sint quaerat rem odio,
      necessitatibus eos similique earum. Optio. Facilis, officiis nemo
      molestias id ex vitae porro optio voluptatum, inventore magni eum debitis
      illo, recusandae ut. Vitae nobis debitis quia quas, laborum ratione odio
      natus beatae labore at animi! Tempore, iusto dolore deserunt laboriosam in
      iste voluptas totam obcaecati aut maiores similique ut minus vero nemo
      veniam suscipit reprehenderit eos tempora ab consequatur autem non. Illo
      blanditiis ea architecto? Qui maiores quisquam quos vitae tenetur
      repudiandae omnis corporis laborum ratione modi iste optio non, sapiente a
      earum, culpa possimus similique illum veritatis provident. Quam quisquam
      ipsa perferendis aut sunt! Dolorem in omnis laboriosam blanditiis libero
      numquam sed voluptate nulla magnam soluta quisquam dolorum eius sunt fuga,
      aliquid iusto cupiditate quod voluptatem asperiores, unde quas. Laboriosam
      voluptatibus eveniet labore velit! Distinctio hic adipisci officia neque
      alias. Qui quasi ipsa perferendis harum distinctio vitae optio aut placeat
      ratione, a consequuntur enim praesentium ducimus tempora ea tempore
      perspiciatis recusandae provident veniam quaerat. Facilis reiciendis
      sapiente animi minus quis? Voluptas, neque corporis, eos voluptate tenetur
      error ipsa temporibus amet cupiditate, provident consectetur sunt illo
      deserunt recusandae consequatur ipsam fugit dolorum quibusdam numquam
      illum. Nam, cupiditate. Vel neque vero sunt eos doloremque provident
      dignissimos placeat nesciunt fugit tempore perspiciatis, officia est unde.
      Deserunt enim mollitia libero rerum sit sed iste atque nesciunt,
      aspernatur eos. Autem voluptatem ipsam reprehenderit expedita eaque odio
      nobis at temporibus sunt deserunt! Obcaecati, ut? Repellat delectus id
      esse officia nam iste voluptas hic nesciunt ratione, molestias alias
      deserunt vel beatae. Quaerat nam illum voluptate quod ab fugiat, assumenda
      itaque dolorem consequatur harum cumque, dignissimos voluptatum atque iure
      perferendis. Facere placeat ratione quaerat, molestias commodi aliquid
      ullam hic tempore voluptates error! Porro repellendus autem commodi natus.
      Illo reprehenderit maiores rerum dolorum soluta, corporis dolore, beatae
      vero aspernatur quae illum quos exercitationem iste quibusdam recusandae
      assumenda fugit eum aut nesciunt. Ipsam, aut. Sed fugit, odio cupiditate
      omnis eos ea magni voluptatem laborum officia dignissimos laudantium porro
      libero! Harum, voluptas corporis, doloribus assumenda nesciunt quaerat
      laudantium amet repellendus nemo reiciendis voluptatibus vitae id! Neque,
      numquam ipsam! Cupiditate officiis dicta perferendis consectetur vel eos
      amet. Eligendi porro, ratione a excepturi inventore sit illo est assumenda
      molestiae. Minima perferendis quasi velit natus iusto qui debitis? Libero
      quas aut perferendis quisquam doloribus neque nisi eligendi reprehenderit.
      Placeat, a? Dolorem rem ratione voluptatem architecto delectus aliquam
      accusantium error incidunt, voluptatum veniam. Magnam nihil quos molestias
      incidunt pariatur. Laudantium a voluptatum placeat praesentium, fugiat
      possimus dolor libero cupiditate dicta sint qui sit, repellat odio tenetur
      neque! Quibusdam laborum dolore excepturi corporis laboriosam facilis quas
      voluptate incidunt ipsa est. Doloremque ipsam vitae non quibusdam ullam,
      tenetur aperiam adipisci similique mollitia eum dolorem sequi illum
      nostrum earum repellendus repudiandae. Voluptatum ducimus reiciendis saepe
      dolore pariatur unde numquam ipsum! Consectetur, asperiores! Repellendus
      placeat, sequi facere voluptatem doloremque sapiente officiis aperiam
      laborum, reiciendis iste sed ea sunt a assumenda. In dolorum enim,
      praesentium tenetur aspernatur minus deleniti! Tenetur minima nisi rerum
      sint. Tenetur ipsam consequatur facere similique a provident optio minima
      nisi minus sunt excepturi neque, necessitatibus rem consectetur dolorum
      voluptatibus corrupti laudantium. Aperiam reiciendis quisquam distinctio
      fugiat aut eius quod non! Soluta itaque, blanditiis repellendus
      praesentium rerum deleniti totam, corporis dignissimos porro amet cumque
      quo iure laudantium magni consequuntur odit assumenda nihil voluptatibus
      placeat mollitia sint reprehenderit? Provident dolore ab ratione! Esse
      iusto voluptatem iure voluptatum doloribus deserunt, fuga ullam molestias
      cum repellendus, libero reiciendis architecto, labore aperiam tempora?
      Odio pariatur harum facilis ratione ullam dolorum dolores odit voluptas
      inventore id. Aperiam, tempora cupiditate debitis voluptatem ratione nemo
      ipsa necessitatibus aut omnis magni? Dignissimos officia nam molestiae
      quis. Magnam maiores laudantium facilis earum. Ducimus similique, maxime
      voluptas tenetur quas ipsam inventore! Magnam amet enim, quae rerum
      sapiente facilis veniam, libero nemo nam hic laudantium fugit
      reprehenderit ab animi ex. Deserunt aperiam quasi quia? Numquam voluptate
      nam quos, eligendi ea ut exercitationem. Corporis cum, eligendi nobis quis
      nulla blanditiis perspiciatis accusantium provident? Quas maxime ducimus
      provident ipsam inventore. Quos, distinctio possimus debitis provident
      quam, placeat reiciendis aliquid similique modi, ut quisquam! Et. Ipsa,
      quibusdam rerum quo a inventore recusandae quae neque tempora nulla nam,
      vero aut obcaecati omnis atque, dolor veritatis! Recusandae delectus
      repudiandae consequuntur rerum nemo maiores laudantium nisi minus dolor?
      Corporis ut molestias praesentium nulla saepe omnis? Corporis ab nam nihil
      quae temporibus, ipsa repellendus animi, nostrum veniam, dolor sint
      fugiat. Dolor quam architecto autem assumenda enim, est illo quis. Rem
      obcaecati unde porro blanditiis, recusandae velit reprehenderit molestiae
      perferendis a quaerat ducimus illum facere! Aut autem rem maxime aliquam
      ipsum, voluptates ab quo dolorum nisi laboriosam ad minus sequi.
      Necessitatibus amet aliquam facere accusamus assumenda? Veritatis et,
      debitis reiciendis fuga officiis magnam quidem aut voluptatem autem optio
      laborum. Corrupti a eaque temporibus nam ad porro iste ipsa neque et.
      Doloribus quae cupiditate accusantium alias, ducimus illum magni eaque,
      nisi quidem tempora fuga qui cum molestias dolor ipsam repudiandae
      consectetur nostrum voluptate rem. Pariatur consequuntur, officiis
      aspernatur enim vitae adipisci? Esse voluptatibus quia temporibus quos
      maiores rem officiis. Dicta, tempore. Asperiores ex assumenda accusamus,
      porro ipsam, nihil sit cum excepturi illum architecto ducimus at sunt sed
      ad illo nisi consectetur. Neque quod illum aperiam autem ut corrupti velit
      quaerat dolorum est accusamus magnam accusantium nihil vel eum expedita
      voluptate laborum doloremque iusto temporibus rerum quae perferendis quo,
      id odio? Doloribus.
    </section>
  </body>
</html>
