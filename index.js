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
        const generatePDF = async (name) => {
            const existingPdfBytes = await fetch("https://d335luupugsy2.cloudfront.net/cms/files/207518/1620228742certificado-mae_de_pet-banzoo.pdf").then((res) =>
              res.arrayBuffer()
            );
        
            
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
               size: 108,
               font: AESTHETICFont,
               color: rgb(0, 0.118, 0.42),
           });
         
          const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
          saveAs(pdfDataUri,"Certificado.pdf")
        };
