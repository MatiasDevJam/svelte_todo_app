<script>

	import { saveTask, getTasks, onGetTasks,
		deleteTask, getTask, updateTask } from './firebase';

	
	let task = {
		title: '',
		content: '',
		
	}	
	let tasks = [];
	let editStatus = false;
	let currentId;

	onGetTasks((querySnapshot) => {
		let docs = []
		querySnapshot.forEach((doc) => {
			docs.push({...doc.data(), id: doc.id})
		}) 
		tasks = [...docs]
		console.log(tasks);
	})

	const handleSubmit = async() => {
		if( !editStatus ){
			await saveTask( task.title, task.content )
		}else {
			await updateTask(currentId, {
				title: task.title, 
				content: task.content
			});
			editStatus = false
		}
		
		
		task = {
			title: '',
			content: '',
		}	
	}

	const handleDelete = async( id ) => {
		deleteTask( id )
	}

	const handleEdit = ( currentTask ) => {
		editStatus = true
		task.title = currentTask.title,
		task.content = currentTask.content
		currentId = currentTask.id
	}

	const onCancel = () => {
		editStatus = false;
		task = { title: '', content: '' }
	}

</script>

<section>
	<div class="container">
	  <div class="row mt-5">
		<div class="col-md-6">
		  <div class="card p-2 shadow">
			<div class="card-body">
			  <h5 class="card-content mb-4">Add New Note</h5>
			  <form on:submit|preventDefault={ handleSubmit }>
				<div class="form-group">
				  <label for="content">Title</label>
				  <input
					type="text"
					class="form-control"
					bind:value={ task.title }
					placeholder="Note Title" />
				</div>
				<div class="form-group">
				  <label for="content">Content</label>
				  <textarea
					class="form-control"
					bind:value={ task.content }
					rows="3"
					placeholder="Note Content" />
				</div>
				<button type="submit" class="btn btn-primary">
					{#if !editStatus}
						Add note
					{:else}
						Update note
					{/if}
				</button>
				{#if editStatus}
					<button on:click={ onCancel } type="submit" class="btn btn-info">Cancel</button>
				{/if}
			  </form>
			</div>
		  </div>
		  
		</div>
		

		{#each tasks as task}
		<div class="row mt-3">
			<div class="col-md-6">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">{ task.title }</h5>
						<p class="card-text">{ task.content }</p>
						
						<button on:click={ handleEdit( task ) } class="btn btn-info">Edit <i class="fas fa-edit"/></button>
						<button on:click={ handleDelete( task.id ) } class="btn btn-danger">Delete <i class="fas fa-trash-alt"/></button>
					</div>
				</div>
			</div>
		</div>
		{/each}
			  


	  </div>
	</div>
  </section>

