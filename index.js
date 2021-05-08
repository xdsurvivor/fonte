        //PGerar pdf
        const NomeDono = document.getElementById("nome");
        const NomePet = document.getElementById("nomeP");
        const submitBtn = document.getElementById("submitBtn");
        const { PDFDocument, rgb, degrees } = PDFLib;
        
        
        submitBtn.addEventListener("click", () => {
            const val = NomeDono.value;
            const val2 = NomePet.value;
            if (val.trim() !== "" && NomeDono.checkValidity() && NomePet.checkValidity) {
                // console.log(val);
                generatePDF(val,val2);
              } else {
                NomeDono.reportValidity();
                NomePet.reportValidity();                
              }
        });
const loader = document.querySelector("#loading");

function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}


function hideLoading() {
    loader.classList.remove("display");
}

        const generatePDF = async (name) => {
            const existingPdfBytes = await fetch("http://blog.banzoo.com.br/wp-content/uploads/certificado/Certificado.pdf").then((res) =>
                                 res.arrayBuffer()
                   
            );
            displayLoading()
        


            const pdfDoc = await PDFDocument.load(existingPdfBytes);
         
            pdfDoc.registerFontkit(fontkit);
        
            
          //get font
          const fontBytes = await fetch("http://blog.banzoo.com.br/wp-content/uploads/fonts/AESTHETIC%20WHITE.OTF").then((res) =>
          res.arrayBuffer()
        );
          
          const AESTHETICFont  = await pdfDoc.embedFont(fontBytes);
           // Get the first page of the document
           const pages = pdfDoc.getPages();
           const firstPage = pages[0];
         
           
           firstPage.drawText(name, {
             x: 190,
             y: 260,
             size: 64,
             font: AESTHETICFont,
               color: rgb(0, 0.118, 0.42),
               });
           
           firstPage.drawText(NomePet.value, {
               x: 480,
               y: 60,
               size: 88,
               font: AESTHETICFont,
               color: rgb(0, 0.118, 0.42),
           });
         
          const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
          saveAs(pdfDataUri,"Certificado-mae_de_pet.pdf")
                          hideLoading()
        };
