$(function () {
    const jsonFilePath = 'json/photoWall_Data.json';

    fetch(jsonFilePath)
        .then(response => {
            if (response.ok) {
                return response.json(); // 解析JSON数据

            }
            else
                throw new Error('json error');
        })
        .then(jsonData => {
            const root = document.createElement('div');
            root.className = 'container';
            {
                const root2 = document.createElement('div');
                root2.className = 'row';
                jsonData.forEach(rootItem => {
                    const rootCol = document.createElement('div');
                    rootCol.className = "col-12 p-2 mt-4 border border-secondary";
                    {
                        const titleRow = document.createElement('div');
                        titleRow.className = 'row';
                        {
                            {
                                const titleCol = document.createElement('div');
                                titleCol.className = 'col-12';
                                {
                                    const title = document.createElement('h1');
                                    title.textContent = rootItem.title;
                                    titleCol.appendChild(title);
                                }
                                titleRow.appendChild(titleCol);
                            }
                            {
                                const subtitleCol = document.createElement('div');
                                subtitleCol.className = 'col-12';
                                subtitleCol.innerHTML=marked.parse(rootItem.subtitle);
                                /*{
                                    const subtitle = document.createElement('p');
                                    subtitle.textContent = rootItem.subtitle;
                                    subtitleCol.appendChild(subtitle);
                                }*/
                                titleRow.appendChild(subtitleCol);
                            }
                        }
                        rootCol.appendChild(titleRow);
                    }
                    {
                        const photoRow = document.createElement('div');
                        photoRow.className="row border border-secondary mx-auto";
                        rootItem.photo.forEach(photoItem => {
                            const photoCol = document.createElement('div');
                            photoCol.className = "col-6 m-1 py-2 mx-auto";
                            {
                                const card = document.createElement('div');
                                card.className="card border-0";
                                if(photoItem.comment!=null)
                                {
                                    const commentBar=document.createElement('div');
                                    commentBar.className="card-body px-0 py-1";
                                    {
                                        const comment=document.createElement('a');
                                        comment.className='card-body-a';
                                        comment.innerText=photoItem.comment;
                                        commentBar.appendChild(comment);
                                    }
                                    card.appendChild(commentBar);
                                }
                                {
                                    const img=document.createElement('img');
                                    img.className="card-img-bottom rounded";
                                    img.src=photoItem.url;
                                    card.appendChild(img);
                                }
                                photoCol.appendChild(card);
                            }
                            photoRow.appendChild(photoCol);
                        });
                        rootCol.appendChild(photoRow);
                    }
                    root2.appendChild(rootCol);
                });
                root.appendChild(root2);
            }
            document.getElementById('photoWall').appendChild(root);
        });
    /*.catch(error => {
        console.error('error:', error);
    });*/
});